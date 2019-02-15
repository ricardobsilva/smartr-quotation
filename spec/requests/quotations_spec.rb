require 'rails_helper'

RSpec.describe 'QuotationsRequest', type: :request do
  describe 'GET #historic_rates ' do
    before(:each) do
      get '/quotations/historic_rates', params: {number_of_days: 30, base_currency: 'BRL'}
    end

    context 'when call the' do
      it 'render 200 status code' do
        expect(response).to have_http_status(:ok)
      end
    end
  end
end
