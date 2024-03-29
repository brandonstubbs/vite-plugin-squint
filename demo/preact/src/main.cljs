(ns main
  (:require ["preact" :refer [render]]
            ["./app.cljs" :refer [App]]
            ["./index.css"]))

(render #jsx [App] (js/document.getElementById "app"))
