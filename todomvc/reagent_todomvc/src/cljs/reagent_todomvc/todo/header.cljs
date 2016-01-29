(ns reagent-todomvc.todo.header
  (:require [reagent.core :as r]
            [clojure.string :as str]
            [reagent-todomvc.todo.model :as model]
            [reagent-todomvc.helpers.event-helper :as eh]))

(defn input []
  (let [val (r/atom "")
        on-key-up (fn [e]
                    (when (and (eh/key= e "Enter") (not (str/blank? (eh/value e))))
                      (model/add-item! (eh/trim-value e))
                      (reset! val ""))
                    #(true))
        on-change (fn [e]
                    (reset! val (eh/value e))
                    #(true))]
    [^{:component-did-mount (fn [c]
                              (.focus (r/dom-node c))
                              #(true))}
     (fn [] [:input.input {:type "text", :value @val,
                           :on-change on-change,
                           :on-key-up on-key-up}])]))

(defn header []
  [:div.header
    [:h1 "todos"]
    [input]])
