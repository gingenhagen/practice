(ns reagent-todomvc.helpers.reagent-helper)

;
; [ ^{:key (:id item)
;     :component-did-update #(true)}
;   (fn [arg1 arg2]
;     (letfn ...))
;   arg1
;   arg2]
;
; (r/defcomponent-let item [item]
;   [val (r/atom (:text item))
;    editing (r/atom false)])
;
; (defn item [item]
;   (let [val (r/atom (:text item))
;         editing (r/atom false)]
;      (r/component-fn [item]
;        {:key (:id item)
;         :component-did-update
;           #(.log js/console "item-component-did-update")}
;        (letfn))))
;
; (defn)
;
; (r/component-fn item)
;
; [^{:component-did-update
;      (fn [e]
;        (.log js/console "input-component-did-update"))
;    :component-did-mount
;      (fn [e]
;        (.focus (r/dom-node e))
;        (.log js/console "input-component-did-mount"))
;    :something "else"
;    :key "test"}
;  (fn [] [:input.editable {:type "text", :value @val
;                              :on-change on-change-text
;                              :on-key-up on-key-up-text}])]
;
; (r/component-fn
;   {:component-did-update
;    :key 1}
;   [:input.editable])
;
; r/component-fn will return back a [^{} (fn[] [])]
;
; (r/form-1 {:key 1} [:input.editable])
; => [^{:key 1} [:input.editable]]
; (r/form-2 {:key 1} [:input.editable])
;
; (r/form-3)
;
