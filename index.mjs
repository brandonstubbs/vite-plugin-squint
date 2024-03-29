import { compileString } from "squint-cljs";
import esbuild from "esbuild";

// TODO: squint source mapping
export default function viteSquint(opts = {}) {
  const squint = {
    name: "squint_compile",
    transform: function (code, id) {
      if (/\.cljs$/.test(id)) {
        const cs = compileString(code);
        const jsx = esbuild.transformSync(cs, {
          loader: "jsx",
          jsx: "automatic",
        });
        return {
          code: jsx.code,
          map: null,
        };
      }
    },
  };
  return [squint];
}
