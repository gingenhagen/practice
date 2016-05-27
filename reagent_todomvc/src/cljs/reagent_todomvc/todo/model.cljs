(ns reagent-todomvc.todo.model
  (:require [reagent.core :as r]
            [reagent-todomvc.helpers.core-helper :refer [select-vals]]))

(defonce ^:private items (r/atom {}))

(defn get-items []
  @items)

(defonce ^:private filter-type (r/atom :all))

(defn get-filter []
  @filter-type)

(def ^:private index (r/atom 0))

(defn- index! []
  (swap! index inc))

(defn set-filter! [filter]
  (reset! filter-type filter))

(defn- all-keys []
  (keys @items))

(defn all []
  (select-vals @items (all-keys)))

(defn all-count []
  (count (all-keys)))

(defn- active-keys []
  (keys (remove (fn [[k,v]] (:completed v)) @items)))

(defn active []
  (select-vals @items (active-keys)))

(defn active-count []
  (count (active-keys)))

(defn- completed-keys []
  (keys (filter (fn [[k,v]] (:completed v)) @items)))

(defn completed []
  (select-vals @items (completed-keys)))

(defn completed-count []
  (count (completed-keys)))

(defn- add-item [list text]
  (let [id (index!)]
    (assoc-in list [id] {:text text,
                         :completed false,
                         :id id})))

(defn add-item! [text]
  (swap! items add-item text))

(defn- remove-item [list id]
  (dissoc list id))

(defn remove-item! [id]
  (swap! items remove-item id))

(defn- update-item [list id hash]
  (update-in list [id] merge hash))

(defn update-item! [id hash]
  (swap! items update-item id hash))

(defn- remove-completed [list]
  (apply dissoc list (completed-keys)))

(defn remove-completed! []
  (swap! items remove-completed))
