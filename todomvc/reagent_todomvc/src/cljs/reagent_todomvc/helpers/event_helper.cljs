(ns reagent-todomvc.helpers.event-helper)

(defn key= [event key]
  (-> event .-key (= key)))

(defn value [event]
  (-> event .-target .-value))

(defn checked [event]
  (-> event .-target .-checked))
