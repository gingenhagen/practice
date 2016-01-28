(ns reagent-todomvc.core
    (:require [reagent.core :as reagent :refer [atom]]
              [reagent.session :as session]
              [secretary.core :as secretary :include-macros true]
              [accountant.core :as accountant]
              [reagent-todomvc.todo.app :as todo]))

;; -------------------------
;; Views

(defn home-page []
  [:div [:h2 "Welcome to reagent_todomvc"]
   [:div [:a {:href "/about"} "go to about page"]]
   [:div [:a {:href "/todo"} "go to todo page"]]])

(defn about-page []
  [:div [:h2 "About reagent_todomvc"]
   [:div [:a {:href "/"} "go to the home page"]]])

(defn current-page []
  [:div [(session/get :current-page)]])

(defn todo-page []
  [todo/app])

;; -------------------------
;; Routes

(secretary/defroute "/" []
  (session/put! :current-page #'home-page))

(secretary/defroute "/about" []
  (session/put! :current-page #'about-page))

(secretary/defroute "/todo" []
  (session/put! :current-page #'todo-page))

;; -------------------------
;; Initialize app

(defn mount-root []
  (reagent/render [current-page] (.getElementById js/document "app")))

(defn init! []
  (accountant/configure-navigation!)
  (accountant/dispatch-current!)
  (mount-root))
