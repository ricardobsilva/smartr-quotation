require 'rails_helper'
require './lib/exchangerate/request'

RSpec.describe "Request" do

  context 'make a correct request' do
    VCR.use_cassette("exchangerate/request/correct_result") do
      resource_path = "history?start_at=2019-01-01&end_at=2019-01-10&symbols=USD,AUD,EUR&base=BRL"
      api_response = Exchangerate::Request.where(resource_path)

      it 'the response api is a hash' do
        expect(api_response).to be_kind_of(Hash)
      end

      it 'the api response include a base key ' do
        expect(api_response).to include("base")
      end

      it 'the api response include a start_at key' do
        expect(api_response).to include("start_at")
      end

      it 'the api response include a end_at key' do
        expect(api_response).to include("end_at")
      end

      it 'the api response include a rates key' do
        expect(api_response).to include("rates")
      end
    end
  end

  context 'make an incorrect request' do
    VCR.use_cassette("exchangerate/request/incorrect_result") do
      resource_path = "history?start_at=&end_at2019-01-01=&symbols=USD,AUD,EUR&base=BRL"
      api_response = Exchangerate::Request.where(resource_path)

      it 'the response api is a hash' do
        expect(api_response).to be_kind_of(Hash)
      end

      it 'the response api is a hash' do
        expect(api_response['error']).to eq('missing start_at parameter')
      end
    end
  end
end
