class QuotationsController < ApplicationController
  def exchange
  end

  def historic_rates
    datas = query_params(params[:number_of_days],
                         params[:base_currency])

    response = Exchangerate::Quotation.get_history(datas)
    result = mount_response(response)
    render json: result, status: :ok
  end

  def query_params(number_of_days, base_currency)
    current_date = Date.today
    limit_date = current_date - number_of_days.to_i
    currencies = ['USD','AUD','EUR', 'BRL']
    currencies.delete(base_currency)

    {
       start: limit_date.strftime("%Y-%m-%d"),
       end: current_date.strftime("%Y-%m-%d"),
       currencies: currencies,
       base_currency: base_currency
    }
  end

  def mount_response(result)
    currencies_list = []
    result['rates'].sort.map{|element| currencies_list << element[1].merge(date: element[0])}
    currencies_list
  end
end
