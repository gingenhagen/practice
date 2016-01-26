(ns reagent-todomvc.cards
  (:require [reagent.core :as reagent :refer [atom]]
            [reagent.session :as session]
            [reagent-todomvc.core :as core]
            [reagent-todomvc.todo :as todo])
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
  [todo/footer])
