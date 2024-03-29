import { compileString } from "squint-cljs";
import esbuild from "esbuild";

export default {
  name: "squint_compile",
  transform: function (src, id) {
    if (/\.cljs$/.test(id)) {
      var jsx = compileString(src);
      var js = esbuild.transformSync(jsx, { loader: "jsx" }).code;
      // TODO handle warnings from esbuild transform
      return { code: js, map: null };
    }
  },
};

