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
        on-key-up #(when (= (.-key %) "Enter")
                    (model/add-item! (.-target.value %))
                    (reset! val ""))
        on-change #(reset! val (-> % .-target .-value))]
    (fn [] [:input {:type "text", :value @val,
                    :on-change on-change,
                    :on-key-up on-key-up}])))

(defn item [item]
  (let [val (r/atom (:text item))
        editing (r/atom false)]
    (fn [item]
      (let [on-change-completed #(model/update-item! (:id item)
                                   {:completed (-> % .-target .-checked)})
            on-change-text #(reset! val (-> % .-target .-value))
            on-key-up-text #(case (.-key %)
                             "Enter" (do
                                      (model/update-item! (:id item)
                                        {:text (-> % .-target .-value)})
                                      (reset! editing false))
                             "Escape" (do
                                        (reset! val (:text item))
                                        (reset! editing false))
                             :default)
            on-double-click #(if-not @editing (reset! editing true))]
        [:li {:class (if @editing "editing")
              :on-double-click on-double-click}
          [:input {:type "checkbox", :checked (:completed item),
                   :on-change on-change-completed}]
          [:span (:text item)]
          [:input {:type "text", :value @val,
                   :on-change on-change-text
                   :on-key-up on-key-up-text}]
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
  [:span (pluralize (count (model/active)) "item") " left"])

(defn item-filter [filter-type]
  [:button {:type "button",
            :on-click #(model/set-filter! filter-type)
            :class (str "filter " (if model/filter-active? "active"))}
    (string/capitalize (name filter-type))])

(defn item-filters []
  [:div
    (item-filter :all)
    (item-filter :active)
    (item-filter :completed)])

(defn remove-completed []
  (if (< 0 (count (model/completed)))
    [:button {:type "button", :on-click model/remove-completed! } "Remove completed"]))

(defn footer [all-items]
  (if (< 0 (count all-items))
    [:div
      [items-left]
      [item-filters]
      [remove-completed]]))

(defn app []
  [:div
    [:h1 "todos"]
    [input]
    [items]
    [footer (model/all)]])
