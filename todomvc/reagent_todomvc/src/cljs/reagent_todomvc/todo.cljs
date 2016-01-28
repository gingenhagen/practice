(ns reagent-todomvc.todo
  (:require [reagent.core :as r]
            [reagent-todomvc.todo.input :refer [input]]
            [reagent-todomvc.todo.items :refer [items]]
            [reagent-todomvc.todo.footer :refer [footer]]))

(defn app []
  [:div.app
    [:h1.header "todos"]
    [input]
    [items]
    [footer]])
