(ns reagent-todomvc.todo.footer
  (:require [reagent.core :as r]
            [reagent-todomvc.todo.model :as model]
            [clojure.string :as str]
            [reagent-todomvc.helpers.core-helper :refer [if=]]
            [reagent-todomvc.helpers.string-helper :as strh]))

(defn items-left []
  [:span (strh/pluralize (model/active-count) "item") " left"])

(defn item-filter [filter-type]
  [:button.filter {:type "button",
                   :on-click #(model/set-filter! filter-type)
                   :class (if= [(model/get-filter) filter-type] "active")}
    (str/capitalize (name filter-type))])

(defn item-filters []
  [:div.filters
    (item-filter :all)
    (item-filter :active)
    (item-filter :completed)])

(defn remove-completed []
  (if (< 0 (model/completed-count))
    [:button {:type "button", :on-click model/remove-completed!} "Remove completed"]))

(defn footer []
  (if (< 0 (model/all-count))
    [:div.footer
      [items-left]
      [item-filters]
      [remove-completed]]))
