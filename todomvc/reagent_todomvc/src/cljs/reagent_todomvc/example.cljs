(ns reagent-todomvc.example
  (:require [reagent.core :as r]))

(defn atom-input []
  (let [value (r/atom "foo")
        on-change #(reset! value (-> % .-target .-value))]
    ; (fn []
    #(identity
      [:div
        [:input {:type "text"
                 :value @value
                 :on-change on-change}]
        [:span @value]])))

(defn shared-state []
  (let [val (r/atom "foo")]
    (fn []
      [:div
       [:p "The value is now: " @val]
       [:p "Change it here: " [atom-input]]])))

; (defn plain-component []
;   (fn []
;     [:input {:type "text"}]))
;
; (def component-with-callback
;   (with-meta plain-component
;     {:component-did-mount
;      (fn [this]
;        (.focus (r/dom-node this)))}))

; (def component-with-callback
;   (with-meta (fn []
;                 [:input {:type "text"}])
;     {:component-did-mount
;      (fn [this]
;        (.focus (r/dom-node this)))}))

; (defn component-with-callback []
;   (with-meta
;     (fn []
;       [:input {:type "text"}])
;     {:component-did-mount
;      (fn [this]
;        (.focus (r/dom-node this)))}))

; (defn component-with-callback []
;   [(with-meta
;     (fn []
;       [:input {:type "text"}])
;     {:component-did-mount
;      (fn [this]
;        (.focus (r/dom-node this)))})])

(defn component-with-callback []
  [^{:component-did-mount
       #(.log js/console "example-component-did-mount")
     :component-did-update
       #(.log js/console "example-component-did-update")}
   (fn [] [:input {:type "text"}])])


(defn item-without-meta [item]
  (let [val (r/atom (:text item))
        editing (r/atom false)]
    (fn [item]
      [:li (:text item)])))

; (defn item [item]
;   [(with-meta #(item-without-meta item)
;      {:key (:id item)})])

; (defn item [item]
  ; [:li (:text item)])

; (defn item-without-meta [item]
;   (fn [item]
;      [:li (:text item)]))
;
; (defn item [item]
;   [item-without-meta item])

; (defn item [item]
;   [(fn [item]
;      [:li (:text item)])
;    item])

(defn item [item]
  ^{:key (:id item)}
  [(fn [item]
     [:li (:text item)])
   item])

(defn items []
  [:ul (map item
          [{:text "item 1" :id 1}
           {:text "item 2" :id 2}
           {:text "item 3" :id 3}])])
