class QuotationsController < ApplicationController
  def exchange
  end

  def historic_rates
    historic_rates = HistoricRates.new(params)
    historic_rates.on(:success){|response| render json: response, status: :ok}
    historic_rates.call
  end
end
