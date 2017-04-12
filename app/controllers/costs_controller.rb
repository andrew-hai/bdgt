class CostsController < ApplicationController
  after_action :expire_last_cost_fragments, only: [:create, :update, :destroy]

  # GET /costs
  # GET /costs.json
  def index
    @cost_query = CostQuery.perform(params)
  end

  # GET /costs/new
  def new
    @cost = Cost.new
  end

  # GET /costs/1/edit
  def edit
  end

  # POST /costs
  # POST /costs.json
  def create
    @cost = Cost.new(cost_params.merge(user: current_user))

    respond_to do |format|
      if cost.save
        format.html { redirect_to costs_url, notice: 'Cost was successfully created.' }
        format.json { render :show, status: :created, location: cost }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: cost.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /costs/1
  # PATCH/PUT /costs/1.json
  def update
    respond_to do |format|
      if cost.update(cost_params)
        format.html { redirect_to costs_url, notice: 'Cost was successfully updated.' }
        format.json { render :show, status: :ok, location: cost }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: cost.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /costs/1
  # DELETE /costs/1.json
  def destroy
    cost.destroy
    respond_to do |format|
      format.html { redirect_to costs_url, notice: 'Cost was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  
  private def cost
    @cost ||= Cost.find(params[:id])
  end
  helper_method :cost

  # Never trust parameters from the scary internet, only allow the white list through.
  private def cost_params
    params.require(:cost).permit(
      :cost_category_id,
      :name,
      :amount,
      :description,
      :spent_on
    )
  end
end
