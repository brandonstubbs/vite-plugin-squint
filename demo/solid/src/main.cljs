(ns main
  (:require ["solid-js/web" :refer [render]]
            ["./index.css"]
            ["./App.cljs" :refer [App]]))

(def root (js/document.getElementById "root"))
(render #jsx [App] root)
