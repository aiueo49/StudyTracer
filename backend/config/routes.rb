Rails.application.routes.draw do
  # resources :users, only: [:show]
  # トークンを含むユーザーページのURLを作成する
  get 'users/:token', to: 'users#show', as: 'user'
  resources :study_times, only: [:show] do
    get ':date', to: 'study_times#show_by_date', on: :member, as: :show_by_date
  end
end
