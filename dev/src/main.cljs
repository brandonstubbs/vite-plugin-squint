(ns main
  [:require ["./index.css"]])

(defn main []
  (let [tw (js/document.getElementById "tw")
        h1 (js/document.createElement "h1")]
    (set! (.-textContent h1) "xxx")
    (js/document.body.appendChild h1))
  (js/console.log "fooba")
  (set! (.-innerHTML tw) #html [:h3 {:class "text-red-800"} "Hello, from tailwind"])
  )
