Rails.application.routes.draw do
  root 'dashboards#index'

  resource :dashboard, only: [] do
    get :sample
  end

  resources :costs, except: :show
  resources :cost_categories, except: :show
  resources :funds, except: :show
  resources :incomes, except: :show

  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :charts, only: [] do
        collection do
          get :bar_month_by_category, :area_last_days_costs, :donut_category_by_last
        end
      end
    end
  end

  namespace :kodi do
    namespace :v1 do
      resources :videos, only: [:index, :show] do
        get :search, :root_directory, on: :collection
      end
    end
  end

  namespace :react do
    namespace :v1 do
      resources :audios, only: [:index] do
        get :seed, on: :collection
      end

      resources :users, only: [] do
        get :current, on: :collection
      end
    end
  end

  ActiveAdmin.routes(self)
end
