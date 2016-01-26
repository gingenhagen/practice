(ns reagent-todomvc.todo
  (:require [reagent.core :as reagent :refer [atom]] ; this is required
            [reagent-todomvc.model :as model]
            [clojure.string :as string]))

(defn input []
  [:input {:type "text"}])

(defn item [item]
  [:li
    [:input {:type "checkbox", :checked (:completed item)}]
    [:span (:text item)]
    [:input {:type "text", :value (:text item)}]])

(defn items []
  [:ul (map #(item %1)
          (case @model/filter-type
            :all (model/all),
            :active (model/active),
            :completed (model/completed)))])

(defn pluralize [count description]
  (str count " " description (if (= count 1) "" "s")))

(defn items-left []
  [:span (pluralize (count (model/active)) "item") " left"])

(defn item-filter [filter-type]
  [:button {:type "button",
            :on-click #(model/set-filter! filter-type)
            :class (str "filter " (if model/filter-active? "active"))}
    (string/capitalize (name filter-type))])

(defn item-filters []
  [:div
    (item-filter :all)
    (item-filter :active)
    (item-filter :completed)])

(defn remove-completed []
  [:button {:type "button"} "Remove completed"])

(defn footer [all-items]
  (if (< 0 (count all-items))
    [:div
      [items-left]
      [item-filters]
      [remove-completed]]))

(defn app []
  [:div
    [:h1 "todos"]
    [input]
    [items]
    [footer (model/all)]])
