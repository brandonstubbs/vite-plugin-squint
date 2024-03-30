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
    resolveId(id, importer, options) {
      if (/\.cljs.jsx$/.test(id)) {
        // other plugins might make us resolve ourselves
        return path.resolve(dirname(importer), id);
      }
      if (/\.cljs$/.test(id)) {
        // For cljs files we need to do the following:
        // absolutize the path, this makes it easier for load and other plugins
        // append .jsx so that other plugins can pick it up
        const absolutePath = path.resolve(dirname(importer), id);
        if (options.scan) {
          // Vite supports the concept of virtual modules, which are not direct
          // files on disk but dynamically generated contents that Vite and its
          // plugins can work with. We return a virtual module identifier
          // (prefixed with \0 to denote its virtual nature), we effectively
          // communicate to Vite and other plugins in the ecosystem that the
          // module is managed by the plugin and should be treated differently
          // from regular file-based modules. As `.cljs.jsx` files are not real.
          // https://vitejs.dev/guide/api-plugin#virtual-modules-convention
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
