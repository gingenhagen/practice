(ns reagent-todomvc.model
  (:require [reagent.core :as r :refer [atom]]))

(defonce items (r/atom []))

(defonce filter-type (r/atom :all))

(def index (r/atom 0))

(defn index! []
  (swap! index inc))

(defn set-filter! [filter]
  (reset! filter-type filter))

(defn all []
  @items)

(defn active []
  (remove #(:completed %1) @items))

(defn completed []
  (filter #(:completed %1) @items))

(defn filter-all? []
  (= filter-type :all))

(defn filter-active? []
  (= filter-type :active))

(defn filter-completed? []
  (= filter-type :completed))

(defn add-item [list text]
  (conj list {:text text,
              :completed false,
              :id (index!)}))

(defn add-item! [text]
  (swap! items #(add-item %1 text)))

(defn has-id [item id]
  (= id (:id item)))

(defn remove-item [list id]
  (remove #(has-id %1 id) list))

(defn remove-item! [id]
  (swap! items #(remove-item %1 id)))
