(ns main
  (:require ["react" :as React :refer [StrictMode]]
            ["react-dom/client" :as ReactDOM]
            ["./App.cljs" :refer [App]]
            ["./index.css"]))


(def root (ReactDOM/createRoot (js/document.getElementById "root")))
(.render root #jsx [StrictMode [App]])
