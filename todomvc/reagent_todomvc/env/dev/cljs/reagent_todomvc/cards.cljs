(ns reagent-todomvc.cards
  (:require [reagent.core :as reagent :refer [atom]]
            [reagent.session :as session]
            [reagent-todomvc.core :as core]
            [reagent-todomvc.todo.app :as todo]
            [reagent-todomvc.todo.model :as model]
            [reagent-todomvc.example :as example])
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
  [todo/app]
  {:items model/items
   :filter-type model/filter-type}
  {:inspect-data true
   :history true})

(defcard-rg component-with-callback-card
  [example/component-with-callback])

(defcard-rg example-items
  [example/items])
;
; (defcard-rg todo-input
;   [todo/input])
;
; (defcard-rg todo-list
;   [todo/items])
;
; (defcard-rg todo-footer
;   "This footer should exist because we pass in a non-empty list of items"
;   [todo/footer (model/all)]
;   {:items (model/get-items)
;    :filter-type (model/get-filter)}
;   {:inspect-data true
;    :history true})
;
; (defcard-rg empty-footer
;   "This footer should be empty because we pass in an empty list of items"
;   [todo/footer []]
;   [])
;
; (defcard-rg example-state
;   "This is an example from https://reagent-project.github.io/"
;   [:div
;     [example/shared-state]])
