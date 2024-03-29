import { compileString } from "squint-cljs";
import esbuild from "esbuild";

export default function viteSquint(opts = {}) {
  const squint = {
    name: "squint_compile",
    transform: function (src, id) {
      console.log("transform new 4", id);
      if (/\.cljs$/.test(id)) {
        var jsx = compileString(src);
        var js = esbuild.transformSync(jsx, { loader: "jsx" }).code;
        // TODO handle warnings from esbuild transform
        return { code: js, map: null };
      }
    },
  };
  return [squint];
}
