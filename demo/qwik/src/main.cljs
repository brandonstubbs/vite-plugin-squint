(ns main
  (:require ["@builder.io/qwik/qwikloader.js"]
            ["@builder.io/qwik" :refer [render]]
            ["./app.cljs" :refer [App]]
            ["./index.css"]))

(render (js/document.getElementById "app") #jsx[App])
