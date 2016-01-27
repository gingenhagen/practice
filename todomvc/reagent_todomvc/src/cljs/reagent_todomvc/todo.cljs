(ns reagent-todomvc.todo
  (:require [reagent.core :as r :refer [atom]] ; this is required
            [reagent-todomvc.model :as model]
            [clojure.string :as string]))

(defonce init (do
                (model/add-item! "item #1")
                (model/add-item! "item #2")
                (model/add-item! "item #3")))

(defn input []
  (let [val (r/atom "")
        ; on-key-up (fn [e] (when...
        ; on-key-up #(when (= (.-key %) "Enter")
        on-key-up #(when (-> % .-key (= "Enter"))
                    (model/add-item! (.-target.value %))
                    (reset! val ""))
        on-change #(reset! val (-> % .-target .-value))]
    (fn [] [:input.input {:type "text", :value @val,
                          :on-change on-change,
                          :on-key-up on-key-up}])))

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
  [:ul (map #(vector item %1)
          (case @model/filter-type
            :all (model/all) ; :all (vals @model/items)
            :active (model/active)
            :completed (model/completed)))])

(defn pluralize [count description]
  (str count " " description (if (= count 1) "" "s")))

(defn items-left []
  [:span (pluralize (model/active-count) "item") " left"])

(defn item-filter [filter-type]
  [:button.filter {:type "button",
                   :on-click #(model/set-filter! filter-type)
                   :class (if (= @model/filter-type filter-type) "active")}
    (string/capitalize (name filter-type))])

(defn item-filters []
  [:div.filters
    (item-filter :all)
    (item-filter :active)
    (item-filter :completed)])

(defn remove-completed []
  (if (< 0 (model/completed-count))
    [:button {:type "button", :on-click model/remove-completed! } "Remove completed"]))

(defn footer []
  (if (< 0 (model/all-count))
    [:div.footer
      [items-left]
      [item-filters]
      [remove-completed]]))

(defn app []
  [:div.app
    [:h1.header "todos"]
    [input]
    [items]
    [footer]])
