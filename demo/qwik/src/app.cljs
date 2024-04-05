(ns app
  (:require ["@builder.io/qwik" :refer [component$ useSignal]]
            ["./assets/qwik.svg$default" :as qwik-logo]
            ["/vite.svg$default" :as vite-logo]
            ["./app.css"]))

(defn -App []
  (let [count (useSignal 0)]
    #jsx [:<>
          [:div
           [:a {:href "https://vitejs.dev" :target "_blank"}
            [:img {:src vite-logo :className "logo" :alt "Vite logo"}]]
                 ;; TODO squint logo
           [:a {:href "https://qwik.builder.io" :target "_blank"}
            [:img {:src qwik-logo :className "logo qwik" :alt "Qwik logo"}]]]
          [:h1 "Vite + Squint + Qwik"]
          [:div {:className "card"}
           [:button {:onClick$ (fn ^:=> [] (set! (.-value count) (inc count)))}
            "count is " (.-value count)]
           [:p "Edit " [:code "src/App.cljs"] " and save to test HMR"]]
          [:p {:className "read-the-docs"}
           "Click on the Vite and Qwik logos to learn more"]]))

(def App (component$ -App))
