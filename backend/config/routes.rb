Rails.application.routes.draw do
  resources :users, only: [:show]
  resources :study_times, only: [:show] do
    get ':date', to: 'study_times#show_by_date', on: :member, as: :show_by_date
  end
end
