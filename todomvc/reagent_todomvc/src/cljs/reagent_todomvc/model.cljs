(ns reagent-todomvc.model
  (:require [reagent.core :as r :refer [atom]]))

(def items [{:text "item #1", :completed true}
            {:text "item #2", :completed false}
            {:text "item #3", :completed true}])

(def filter-type (r/atom :all))

(defn set-filter! [filter]
  (reset! filter-type filter))

(defn all []
  items)

(defn active []
  (remove #(:completed %1) items))

(defn completed []
  (filter #(:completed %1) items))

(defn filter-all? []
  (= filter-type :all))

(defn filter-active? []
  (= filter-type :active))

(defn filter-completed? []
  (= filter-type :completed))
