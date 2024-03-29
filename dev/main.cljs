(defn main []
  (let [h1 (js/document.createElement "h1")]
    (set! (.-textContent h1) "xxx")
    (js/document.body.appendChild h1))
  (js/console.log "fooba"))
