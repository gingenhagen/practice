(ns reagent-todomvc.helpers.event-helper
  (:require [clojure.string :as str]))

(defn key= [event key]
  (-> event .-key (= key)))

(defn value [event]
  (-> event .-target .-value))

(defn trim-value [event]
  (-> event .-target .-value str/trim))

(defn checked [event]
  (-> event .-target .-checked))
