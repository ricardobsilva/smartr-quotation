Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :quotations do
    get 'exchange', on: :collection
    get 'historic_rates', on: :collection
  end
end
