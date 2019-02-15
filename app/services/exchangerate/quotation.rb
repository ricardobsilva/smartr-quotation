require './lib/exchangerate/request'
class Exchangerate::Quotation

  def self.get_history(params)
    currencies_to_compare = params[:currencies].join(',')
    base_currency = params[:base_currency]
    resource_path = "history?start_at=#{params[:start]}&end_at=#{params[:end]}&symbols=#{currencies_to_compare}&base=#{base_currency}"
    Exchangerate::Request.where(resource_path)
  end
end
