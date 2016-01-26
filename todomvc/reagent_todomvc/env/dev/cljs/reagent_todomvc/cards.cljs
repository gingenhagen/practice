(ns reagent-todomvc.cards
  (:require [reagent.core :as reagent :refer [atom]]
            [reagent.session :as session]
            [reagent-todomvc.core :as core]
            [reagent-todomvc.todo :as todo]
            [reagent-todomvc.model :as model])
  (:require-macros
   [devcards.core
    :as dc
    :refer [defcard defcard-doc defcard-rg deftest]]))

(defcard-rg first-card
  [:div>h1 "This is your first devcard!"])

(defcard-rg home-page-card
  [core/home-page])

(reagent/render [:div] (.getElementById js/document "app"))

;; remember to run 'lein figwheel devcards' and then browse to
;; http://localhost:3449/cards

(defcard-rg todo-core-card
  [todo/app])

(defcard-rg todo-input
  [todo/input])

(defcard-rg todo-list
  [todo/items])

(defcard-rg todo-footer
  "This footer should exist because we pass in a non-empty list of items"
  [todo/footer (model/all)]
  {:items model/items,
   :filter-type @model/filter-type}
  {:inspect-data true
   :history true})

(defcard-rg empty-footer
  "This footer should be empty because we pass in an empty list of items"
  [todo/footer []]
  [])
