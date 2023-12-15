Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  namespace :api do
    namespace :v1 do
      resources :users, :tours, :companies, defaults: { format: 'json' } do
        member do
          get 'galleries'
          get 'companies'
          get 'galleries', to: 'tours#galleries_id'
          get 'company_id', to: 'tours#company_id'
          post '/galleries', to: 'tours#create_gallery'
          get 'user_companies', to: 'tours#user_companies'
          get 'associated_tours', to: 'companies#associated_tours'
          get 'get_user_role', to: 'users#get_user_role'
          get 'user_companies_with_tours', to: 'tours#user_companies_with_tours'
          get 'user_email_for_tour', to: 'tours#user_email_for_tour'
          put 'change_role', to: 'users#change_role'
        end
      end
    end
  end
end
