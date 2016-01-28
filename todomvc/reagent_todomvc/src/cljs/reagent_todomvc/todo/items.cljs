(ns reagent-todomvc.todo.items
  (:require [reagent.core :as r]
            [reagent-todomvc.todo.model :as model]))

(defn item [item]
  (let [val (r/atom (:text item))
        editing (r/atom false)]
    (fn [item]
      (letfn [(on-change-completed [e]
                (model/update-item!
                  (:id item)
                  {:completed (-> e .-target .-checked)}))
              (on-change-text [e]
                (reset! val (-> e .-target .-value)))
              (on-key-up-text [e]
                (case (.-key e)
                  "Enter" (save-text (-> e .-target .-value))
                  "Escape" (cancel-text)
                  :default))
              (on-double-click []
                (if-not @editing (reset! editing true)))
              (save-text [text]
                (model/update-item! (:id item)
                  {:text text})
                (reset! editing false))
              (cancel-text []
                (reset! val (:text item))
                (reset! editing false))]
        [:li.item {:class (if (:completed item) "completed")}
          [:input {:type "checkbox", :checked (:completed item)
                   :on-change on-change-completed}]
          [:div.text {:on-double-click on-double-click
                      :class (if @editing "editing")}
            [:span.readonly (:text item)]
            [:input.editable {:type "text", :value @val
                              :on-change on-change-text
                              :on-key-up on-key-up-text}]]
          [:button {:type "button",
                    :on-click #(model/remove-item! (:id item))}
                   "X"]]))))

(defn items []
  [:ul (map (fn[el] ^{:key (:id el)} [item el])
         (case (model/get-filter)
           :all (model/all)
           :active (model/active)
           :completed (model/completed)))])
