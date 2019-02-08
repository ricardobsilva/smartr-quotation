require 'connection'
class Exchangerate::Request
  class << self
    def where(resource_path)
      response = api.get(resource_path)
      JSON.parse(response.body)
    end

    def api
      Exchangerate::Connection.api
    end
  end
end
