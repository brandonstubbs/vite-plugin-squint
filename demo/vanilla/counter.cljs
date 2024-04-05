(ns counter)


(defn setup-counter
  [el]
  (let [counter (atom 0)
        set-counter
        (fn [count]
          (reset! counter count)
          (set! (.-innerHTML el) (str "count is " @counter)))
        _ (.addEventListener el "click" #(set-counter (inc @counter)))]
    (set-counter 0)))
