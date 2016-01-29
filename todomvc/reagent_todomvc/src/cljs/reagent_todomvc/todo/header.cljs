(ns reagent-todomvc.todo.header
  (:require [reagent.core :as r]
            [reagent-todomvc.todo.model :as model]
            [reagent-todomvc.helpers.event-helper :as e]))

(defn input-without-meta []
  (let [val (r/atom "")
        on-key-up #(when (e/key= % "Enter")
                     (model/add-item! (e/value %))
                     (reset! val ""))
        on-change #(reset! val (e/value %))]
    (fn [] [:input.input {:type "text", :value @val,
                          :on-change on-change,
                          :on-key-up on-key-up}])))


(def input (with-meta input-without-meta
             {:component-did-mount #(.focus (r/dom-node %))}))

(defn header []
  [:div.header
    [:h1 "todos"]
    [input]])
