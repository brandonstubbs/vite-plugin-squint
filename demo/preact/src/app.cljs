(ns app
  (:require ["preact/hooks" :refer [useState]]
            ["./assets/preact.svg$default" :as preact-logo]
            ["/vite.svg$default" :as vite-logo]
            ["./app.css"]))

(defn App []
  (let [[count set-count] (useState 0)]
    #jsx [:<>
          [:div
           [:a {:href "https://vitejs.dev" :target "_blank"}
            [:img {:src vite-logo :className "logo" :alt "Vite logo"}]]
           ;; TODO squint logo
           [:a {:href "https://preactjs.com" :target "_blank"}
            [:img {:src preact-logo :className "logo preact" :alt "Preact logo"}]]]
          [:h1 "Vite + Squint + Preact"]
          [:div {:className "card"}
           [:button {:onClick #(set-count (inc count))}
            "count is " count]
           [:p "Edit " [:code "src/App.cljs"] " and save to test HMR"]]
          [:p {:className "read-the-docs"}
           "Click on the Vite and Preact logos to learn more"]]))
