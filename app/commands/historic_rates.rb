class HistoricRates
  include Wisper::Publisher

  def initialize(params)
    @params = params
  end

  def call
    execute
  end

  def execute
    history = Exchangerate::Quotation.get_history(query_params)
    response = mount_response(history)
    broadcast(:success, response)
  end

  def query_params
    current_date = Date.today
    limit_date = current_date - @params[:number_of_days].to_i
    currencies = ['USD','AUD','EUR', 'BRL']
    currencies.delete(@params[:base_currency])

    {
       start: limit_date.strftime("%Y-%m-%d"),
       end: current_date.strftime("%Y-%m-%d"),
       currencies: currencies,
       base_currency: @params[:base_currency]
    }
  end

  def mount_response(result)
    currencies_list = []
    result['rates'].sort.map{|element| currencies_list << element[1].merge(date: element[0])}
    currencies_list
  end
end
