(ns reagent-todomvc.helpers.core-helper)

(defn if=
  ([test-args then] (if (apply = test-args) then))
  ([test-args then else] (if (apply = test-args) then else)))

(defn if-not=
  ([test-args then] (if-not (apply = test-args) then))
  ([test-args then else] (if-not (apply = test-args) then else)))

(defn select-vals [map keyseq]
  (vals (select-keys map keyseq)))
