(ns reagent-todomvc.model
  (:require [reagent.core :as reagent :refer [atom]]))

(def items [{:text "item #1", :completed true}
            {:text "item #2", :completed false}
            {:text "item #3", :completed true}])
