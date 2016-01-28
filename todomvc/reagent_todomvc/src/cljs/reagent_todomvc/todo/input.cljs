(ns reagent-todomvc.todo.input
  (:require [reagent.core :as r]
            [reagent-todomvc.todo.model :as model]))

(defn input []
  (let [val (r/atom "")
        on-key-up #(when (-> % .-key (= "Enter"))
                     (model/add-item! (.-target.value %))
                     (reset! val ""))
        on-change #(reset! val (-> % .-target .-value))]
    (fn [] [:input.input {:type "text", :value @val,
                          :on-change on-change,
                          :on-key-up on-key-up}])))
