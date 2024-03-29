(ns main
  (:require ["@builder.io/qwik/qwikloader.js"]
            ["@builder.io/qwik" :refer [render]]
            ["./app.cljs" :refer [App]]
            ["./index.css"]))

(render #jsx[App] (js/document.getElementById "app"))
