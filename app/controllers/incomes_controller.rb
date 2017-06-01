class IncomesController < ApplicationController
  after_action :expire_last_cost_fragments, only: [:create, :update, :destroy]

  def index
    @incomes = Income.includes(:user).order('id DESC').per_page_kaminari(params[:page])
  end

  def new
    @income = Income.new
  end

  def edit
  end

  def create
    @income = Income.new(cost_params.merge(user: current_user))

    respond_to do |format|
      if income.save
        format.html { redirect_to incomes_url, notice: 'Income was successfully created.' }
        format.json { render :show, status: :created, location: income }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: income.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if income.update(cost_params)
        format.html { redirect_to incomes_url, notice: 'Income was successfully updated.' }
        format.json { render :show, status: :ok, location: income }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: income.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    income.destroy
    respond_to do |format|
      format.html { redirect_to incomes_url, notice: 'Income was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def income
      @income ||= Income.find(params[:id])
    end
    helper_method :income

    # Never trust parameters from the scary internet, only allow the white list through.
    def cost_params
      params.require(:income).permit(
        :name,
        :amount,
        :description,
        :got_on
      )
    end
end
