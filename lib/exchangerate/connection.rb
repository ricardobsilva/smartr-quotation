require 'faraday'
require 'json'

class Exchangerate::Connection
  BASE = 'https://api.exchangeratesapi.io/'

  def self.api
    Faraday.new(url: BASE) do |faraday|
      faraday.response :logger if !Rails.env.test?
      faraday.adapter Faraday.default_adapter
      faraday.headers['Content-Type'] = 'application/json'
    end
  end
end
