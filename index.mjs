import { compileString } from "squint-cljs";
import path, { dirname } from "path";
import fs from "fs";

export default function viteSquint(opts = {}) {
  const squint = {
    name: "squint_compile",
    enforce: "pre",
    async load(id) {
      // the resolveId adds the .jsx extension
      if (/\.cljs.jsx$/.test(id)) {
        // for cljs files, we just need to load and compile
        // TODO: macros
        // TODO: squint source mapping
        const file = id.replace(/.jsx$/, "");
        const code = await fs.promises.readFile(file, "utf-8");
        const compiled = compileString(code);
        return { code: compiled, map: null };
      }
    },
    resolveId(id, imported, options) {
      if (/\.cljs$/.test(id)) {
        // For cljs files we need to do the following:
        // absolutize the path, this makes it easier for load and other plugins
        // append .jsx so that other plugins can pick it up
        const absolutePath = path.resolve(dirname(imported), id);
        if (options.scan) {
          // this is a scan, return virtual module
          return "\0" + absolutePath + ".jsx";
        }
        return absolutePath + ".jsx";
      }
    },
    handleHotUpdate({file, server, modules }) {
      if (/\.cljs$/.test(file)) {
        // this needs to be the same id returned by resolveId this is what
        // vite uses as the modules identifier
        const resolveId = file + ".jsx";
        const module = server.moduleGraph.getModuleById(resolveId);
        if (module) {
          // invalidate dependants
          server.moduleGraph.onFileChange(resolveId);
          // hot reload
          return [...modules, module ]
        }
        return modules;
      }
    },
  };
  return [squint];
}
