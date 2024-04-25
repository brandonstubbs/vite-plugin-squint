import { compileString } from "squint-cljs/compiler/node";
import path, { dirname } from "path";
import fs from "fs";

function hasExtension(filePath) {
  return path.extname(filePath).length > 0;
}

function isFile(filePath) {
  const stats = fs.statSync(filePath, { throwIfNoEntry: false });
  return stats?.isFile();
}

export default function viteSquint(opts = {}) {
  let outputDir = opts.outputDir || "squint_out";
  let compiler;
  let projectRoot;
  let infilemap = {};
  let outfilemap = {};
  let infileChangedMs = {};
  const squint = {
    name: "squint_compile",
    enforce: "pre",
    configResolved(config) {
      projectRoot = config.root;
    },
    options(opts) {
      // we would create the squint compiler with the opts, such as `output-dir`
      // compiler = new squint_compiler(opts);
    },
    resolveId(id, importer, options) {
      // TODO: This works, but not sure of the implications of this.
      // vite does a scan to find dependencies, without loading files, as the
      // out files will not exists we ignore this scan.
      if (options.scan) {
        return null;
      }
      const infile = outfilemap[importer];
      // if there is an infile, we resolve relative to that file. This is the
      // original `cljs` file.
      const absPath = path.resolve(dirname(infile || importer), id);
      // if there is no extension, we check to see if we can resolve a `.cljs` file
      if (!hasExtension(id)) {
        const resolveCljsFile = `${absPath}.cljs`;
        if (isFile(resolveCljsFile)) {
          console.log("resolving import as cljs file", id);
          id = resolveCljsFile;
        }
      }
      // we resolve the `.cljs` file that we want to compile, to the `output-dir`+`filename.jsx`
      if (/\.cljs$/.test(id)) {
        const absPath = path.resolve(dirname(infile || importer), id);
        const relPath = path.relative(projectRoot, absPath).replace(/\.cljs$/, ".jsx");
        const outPath = `${projectRoot}/${outputDir}/${relPath}`;
        console.log("resolving cljs->jsx", absPath, outPath);
        // keep links from in to out files both ways.
        infilemap[absPath] = outPath;
        outfilemap[outPath] = absPath;
        return outPath;
      }
      // We need to convert files that are imported from cljs to absolute paths
      // as we compile the `.jsx` files in a different directory which breaks
      // the relative imports.
      // We check if the file exists, as it may be a library. Maybe a better
      // way to do this check?
      if (!/\.cljs$/.test(id) && infile) {
        const absPath = path.resolve(dirname(infile), id);
        if (isFile(absPath)) {
          console.log("resolving import from", infile, "to absolute path", absPath);
          return absPath;
        }
      }
    },
    async load(id) {
      const infile = outfilemap[id];
      if (infile) {
        const stats = fs.statSync(infile);
        const modTime = infileChangedMs[id] || 0;
        // we compile the file if the file has changed, we need to check if the
        // file has changed otherwise we end up in an infinite loop.
        if (modTime < stats.mtimeMs) {
          // instead of loading the source and compiling here, we would call
          // the squint compiler to compile the file and load the compiled file
          // and (future) source mapping.
          console.log("compiling cljs file", infile);
          const code = fs.readFileSync(infile, "utf-8");
          const compiled = await compileString(code, {"in-file": infile});
          fs.mkdirSync(dirname(id), { recursive: true });
          fs.writeFileSync(id, compiled.javascript);
          infileChangedMs[id] = stats.mtimeMs;
        }
        // load the file
        console.log("loading compiled cljs file", id);
        const code = fs.readFileSync(id, "utf-8");
        return { code, map: null };
      }
    },
    handleHotUpdate({ file, server, modules }) {
      // `resolveId` returns the `outFile` so we need to use that reference
      // to trigger the hot reloads. The input `file` will be the file that
      // you are changing, the `cljs` file.
      let outFile = infilemap[file];
      if (outFile) {
        const module = server.moduleGraph.getModuleById(outFile);
        if (module) {
          console.log("HMR triggered by", file, "updating", outFile);
          // invalidate dependants
          server.moduleGraph.onFileChange(outFile);
          // hot reload
          return [...modules, module];
        }
        return modules;
      }
    },
  };
  return [squint];
}
