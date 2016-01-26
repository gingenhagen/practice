(ns reagent-todomvc.example
  (:require [reagent.core :as r]))

(defn atom-input []
  (let [value (r/atom "foo")
        on-change #(reset! value (-> % .-target .-value))]
    ; (fn []
    #(identity
      [:div
        [:input {:type "text"
                 :value @value
                 :on-change on-change}]
        [:span @value]])))

(defn shared-state []
  (let [val (r/atom "foo")]
    (fn []
      [:div
       [:p "The value is now: " @val]
       [:p "Change it here: " [atom-input]]])))
