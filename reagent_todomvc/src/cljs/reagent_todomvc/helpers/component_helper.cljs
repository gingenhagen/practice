(ns reagent-todomvc.helpers.component-helper
  (:require [reagent.core :as r]))

; c is for component
; helpers meant to be used in component lifecycle callbacks

(defn focus [c]
  (.focus (r/dom-node c)))

(defn focus-input-end [c]
  (.focus (r/dom-node c))
  (set! (.-value (r/dom-node c)) (.-value (r/dom-node c))))
