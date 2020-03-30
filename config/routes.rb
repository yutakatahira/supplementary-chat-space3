Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :groups, except: %i(destroy show) do
    resources :messages, only: %i(index create)
  end
  resources :users, only: %i(new edit update)
end
