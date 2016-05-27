(ns reagent-todomvc.helpers.reagent-helper)

(defmacro map-keyed [map-fn key-fn coll]
  (list 'map (list 'fn ['x] (list 'with-meta [map-fn 'x] {':key (list key-fn 'x)})) coll))
