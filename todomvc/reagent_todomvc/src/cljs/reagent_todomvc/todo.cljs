(ns reagent-todomvc.todo
  (:require [reagent.core :as reagent :refer [atom]] ; this is required
            [reagent-todomvc.model :as model]))

(defn input []
  [:input {:type "text"}])

(defn items [items]
  [:ul
    (map #(vector :li %1)
      items)])

(defn items-left []
  [:span "1 items left"])

(defn items-filter []
  [:div
    [:button {:type "button"} "All"]
    [:button {:type "button"} "Active"]
    [:button {:type "button"} "Completed"]])

(defn remove-completed []
  [:button {:type "button"} "Remove completed"])

(defn footer []
  [:div
    [items-left]
    [items-filter]
    [remove-completed]])

(defn app []
  [:div
    [:h1 "todos"]
    [input]
    [items model/items]
    [footer]])
