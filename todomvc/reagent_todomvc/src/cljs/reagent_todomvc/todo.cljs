(ns reagent-todomvc.todo
  (:require [reagent.core :as reagent :refer [atom]] ; this is required
            [reagent-todomvc.model :as model]))

(defn input []
  [:input {:type "text"}])

(defn item [item]
  [:li
    [:input {:type "checkbox", :checked (:completed item)}]
    [:span (:text item)]
    [:input {:type "text", :value (:text item)}]])

(defn items [items]
  [:ul (map #(item %1) items)])

(defn pluralize [items-count description]
  (str items-count " " description (if (= items-count 1) "" "s")))

(defn items-left [items-count]
  [:span (pluralize items-count "item") " left"])

(defn items-filter []
  [:div
    [:button {:type "button"} "All"]
    [:button {:type "button"} "Active"]
    [:button {:type "button"} "Completed"]])

(defn remove-completed []
  [:button {:type "button"} "Remove completed"])

(defn footer []
  [:div
    [items-left (count model/items)]
    [items-filter]
    [remove-completed]])

(defn app []
  [:div
    [:h1 "todos"]
    [input]
    [items model/items]
    [footer]])
