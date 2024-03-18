Rails.application.routes.draw do
  match "/", to: "users#show"
  # resources :users, only: [:show]
  # トークンを含むユーザーページのURLを作成する
  get 'users/:token', to: 'users#show', as: 'user'
  # トークンを含むStudyTimeのURLを作成する
  get 'study_times/:token', to: 'study_times#show', as: 'study_time'
  resources :study_times, only: [], param: :token do
    get ':date', to: 'study_times#show_by_date', on: :member, as: :show_by_date
  end
end
