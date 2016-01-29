(ns reagent-todomvc.todo.header
  (:require [reagent.core :as r]
            [reagent-todomvc.helpers.string-helper :as strh]
            [reagent-todomvc.todo.model :as model]
            [reagent-todomvc.helpers.event-helper :as eh]
            [reagent-todomvc.helpers.component-helper :as ch]))

(defn input []
  (let [val (r/atom "")
        on-key-up #(when (and (eh/key= % "Enter") (strh/not-blank? (eh/value %)))
                     (model/add-item! (eh/trim-value %))
                     (reset! val ""))
        on-change #(reset! val (eh/value %))]
    [^{:component-did-mount #(ch/focus %)}
     (fn [] [:input.input {:type "text", :value @val
                           :on-change on-change
                           :on-key-up on-key-up}])]))

(defn header []
  [:div.header
    [:h1 "todos"]
    [input]])
