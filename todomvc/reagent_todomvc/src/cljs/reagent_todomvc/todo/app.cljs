(ns reagent-todomvc.todo.app
  (:require [reagent.core :as r]
            [reagent-todomvc.todo.header :refer [header]]
            [reagent-todomvc.todo.items :refer [items]]
            [reagent-todomvc.todo.footer :refer [footer]]))

(defn app []
  [:div.app
    [header]
    [items]
    [footer]])
