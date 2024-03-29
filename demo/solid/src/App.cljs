(ns app
  (:require ["solid-js" :refer [createSignal]]
            ["./assets/solid.svg$default" :as solid-logo]
            ["/vite.svg$default" :as vite-logo]
            ["./App.css"]))


(defn App []
  (let [[count set-count] (createSignal 0)]
    #jsx [:<>
          [:div
           [:a {:href "https://vitejs.dev" :target "_blank"}
            [:img {:src vite-logo :className "logo" :alt "Vite logo"}]]
           ;; TODO: squint logo
           [:a {:href "https://solidjs.com" :target "_blank"}
            [:img {:src solid-logo :className "logo solid" :alt "Solid logo"}]]]
          [:h1 "Vite + Squint + Solid"]
          [:div {:className "card"}
           [:button {:onClick #(set-count (inc count))}
            "count is " count]
           [:p "Edit " [:code "src/App.cljs"] " and save to test HMR"]]
          [:p {:className "read-the-docs"}
           "Click on the Vite and Solid logos to learn more"]]))
