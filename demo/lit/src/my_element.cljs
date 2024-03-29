(ns my-element
  (:require ["lit" :refer [LitElement css html]]
            ["./assets/lit.svg$default" :as lit-logo]
            ["/vite.svg$default" :as vite-logo]))


(defclass MyElement
  (extends LitElement)

  ;; TODO: static get properties()

  (constructor [this]
    (super)
    (set! (.-docsHint this) "Click on the Vite and Lit logos to learn more")
    (set! (.-count this) 0))

  Object
  (render [this]
    #html ^html
     [:<>
      [:div
       [:a {:href "https://vitejs.dev" :target "_blank"}
        [:img {:src vite-logo :className "logo" :alt "Vite logo"}]]
       ;; TODO: squint logo
       [:a {:href "https://lit.dev" :target "_blank"}
        [:img {:src lit-logo :className "logo lit" :alt "Lit logo"}]]]
      [:slot]
      [:div {:class "card"}
       ;; TODO @click
       [:button {:part "button"} "count is " (.-count this)]]
      [:p {:class "read-the-docs"} (.-docsHint this)]])

  (-onClick [this]
    (set! (.-count this) (inc (.-count this))))

  ;; TODO: static get styles()
  )


(js/window.customElements.define "my-element" MyElement)
