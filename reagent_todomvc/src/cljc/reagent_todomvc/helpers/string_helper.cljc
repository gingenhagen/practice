(ns reagent-todomvc.helpers.string-helper
  (:require [clojure.string :as str]
            [reagent-todomvc.helpers.core-helper :refer [if= if-not=]]))

(defn not-blank? [val]
  (not (str/blank? val)))

(defn pluralize [count description]
  (str count " " description (if-not= [count 1] "s" "")))
