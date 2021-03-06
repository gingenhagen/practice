(ns reagent-todomvc.todo.items
  (:require [reagent.core :as r]
            [clojure.string :as str]
            [reagent-todomvc.todo.model :as model]
            [reagent-todomvc.helpers.event-helper :as eh]
            [reagent-todomvc.helpers.component-helper :as ch]
            [reagent-todomvc.helpers.reagent-helper :as rh :include-macros true]))

(defn item [item]
  (let [val (r/atom (:text item))
        editing (r/atom false)]
    (fn [item]
      (letfn
        [(on-change-completed [e]
           (model/update-item! (:id item) {:completed (eh/checked e)}))
         (on-change-text [e]
           (reset! val (eh/value e)))
         (on-key-up-text [e]
           (case (.-key e)
             "Enter" (save-text (eh/trim-value e))
             "Escape" (cancel-text)
             :default))
         (on-double-click []
           (if-not @editing (reset! editing true))
           #(true))
         (save-text [text]
           (when-not (str/blank? text)
             (model/update-item! (:id item) {:text text})
             (reset! val text)
             (reset! editing false))
           #(true))
         (cancel-text []
           (reset! val (:text item))
           (reset! editing false)
           #(true))]
        [:li.item {:class (if (:completed item) "completed")}
          [:input {:type "checkbox", :checked (:completed item)
                   :on-change on-change-completed}]
          [:div.text {:on-double-click on-double-click
                      :class (if @editing "editing")}
            [:span.readonly (:text item)]
            [^{:component-did-mount #(if @editing (ch/focus-input-end %))}
             (fn [] [:input.editable {:type "text", :value @val
                                      :on-change on-change-text
                                      :on-key-up on-key-up-text
                                      :on-blur cancel-text}])]]
          [:button {:type "button",
                    :on-click #(model/remove-item! (:id item))}
                   "X"]]))))

(defn items []
  ;[:ul (map (fn [x] ^{:key (:id x)} [item x])
  [:ul (rh/map-keyed item :id
         (case (model/get-filter)
           :all (model/all)
           :active (model/active)
           :completed (model/completed)))])
