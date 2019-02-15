require 'rails_helper'

RSpec.describe 'HistoricRates' do
  let(:params){ {number_of_days: 30, base_currency: 'BRL'} }
  let(:historic_rates){ HistoricRates.new(params) }

  describe '#query_params' do
    it 'return a hash' do
      expect(historic_rates.query_params).to be_an(Hash)
    end

    it 'return a hash must have start key' do
      expect(historic_rates.query_params).to include(:start)
    end

    it 'return a hash must have end key' do
      expect(historic_rates.query_params).to include(:end)
    end

    it 'return a hash must have currencies key' do
      expect(historic_rates.query_params).to include(:currencies)
    end

    it 'return a hash must have base_currency key' do
      expect(historic_rates.query_params).to include(:base_currency)
    end
  end
end
