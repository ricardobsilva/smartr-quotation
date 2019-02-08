class Exchangerate::Quotation
  CURRENCIES = ['USD','AUD','EUR']

  def self.get_history(date_interval = {})
    currencies = CURRENCIES.join(',')
    resource_path = "history?start_at=#{date_interval[:start]}&end_at=#{date_interval[:end]}&symbols=#{currencies}&base=BRL"
    puts ">> #{resource_path}"
    Exchangerate::Request.where(resource_path)
  end
end
