class FundsController < ApplicationController
  after_action :expire_fund_change_fragments, only: [:create, :update, :destroy]

  # GET /funds
  # GET /funds.json
  def index
    @funds = Fund.all
    @fund_changes = FundChange.includes(:fund).order('id DESC').page(params[:page])
  end

  # GET /funds/new
  def new
    @fund = Fund.new
  end

  # GET /funds/1/edit
  def edit
  end

  # POST /funds
  # POST /funds.json
  def create
    @fund = Fund.new(fund_params)

    respond_to do |format|
      if fund.save
        format.html { redirect_to funds_url, notice: 'Fund was successfully created.' }
        format.json { render :show, status: :created, location: fund }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: fund.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /funds/1
  # PATCH/PUT /funds/1.json
  def update
    respond_to do |format|
      if fund.update(fund_params)
        format.html { redirect_to funds_url, notice: 'Fund was successfully updated.' }
        format.json { render :show, status: :ok, location: fund }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: fund.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /funds/1
  # DELETE /funds/1.json
  def destroy
    fund.destroy
    respond_to do |format|
      format.html { redirect_to funds_url, notice: 'Fund was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def fund
      @fund ||= Fund.find(params[:id])
    end
    helper_method :fund

    # Never trust parameters from the scary internet, only allow the white list through.
    def fund_params
      params.require(:fund).permit(:name, :amount, :currency, :description)
    end
end
