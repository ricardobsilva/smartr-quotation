class QuotationsController < ApplicationController
  def exchange
  end

  def historic_rates
    date = date_interval(params[:number_of_days])
    response = Exchangerate::Quotation.get_history(date)
    render json: response["rates"].sort, status: :ok
  end

  def date_interval(number_of_days)
    current_date = Date.today

    limit_date = current_date - number_of_days.to_i

    puts current_date.strftime("%Y-%m-%d")
    puts  limit_date.strftime("%Y-%m-%d")
    {
       start: limit_date.strftime("%Y-%m-%d"),
       end: current_date.strftime("%Y-%m-%d")
    }
  end
end
