(ns reagent-todomvc.helpers.string-helper
  (:require [clojure.string :as str]))


(defn not-blank? [val]
  (not (str/blank? val)))
