(ns main
  (:require ["./style.css"]
            ["/vite.svg$default" :as vite-logo]
            ["./counter.cljs" :refer [setup-counter]]))


(set! (.-innerHTML (js/document.querySelector "#app"))
  #html [:div
         [:a {:href "https://vitejs.dev" :target "_blank"}
          [:img {:src vite-logo :class "logo" :alt "Vite logo"}]]
         ;; TODO squint logo
         [:h1 "Hello Vite!"]
         [:div {:class "card"}
          [:button {:id "counter" :type "button"}]]
         [:p {:class "read-the-docs"}
          "Click on the Vite logo to learn more"]])

(setup-counter (js/document.querySelector "#counter"))
