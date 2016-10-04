class CostCategoriesController < ApplicationController
  before_action :set_cost_category, only: [:show, :edit, :update, :destroy]
  after_action :expire_last_cost_fragments, only: [:create, :update, :destroy]

  # GET /cost_categories
  # GET /cost_categories.json
  def index
    @cost_categories = CostCategory.all
  end

  # GET /cost_categories/new
  def new
    @cost_category = CostCategory.new
  end

  # GET /cost_categories/1/edit
  def edit
  end

  # POST /cost_categories
  # POST /cost_categories.json
  def create
    @cost_category = CostCategory.new(cost_category_params)

    respond_to do |format|
      if @cost_category.save
        format.html { redirect_to cost_categories_url, notice: 'Cost category was successfully created.' }
        format.json { render :show, status: :created, location: @cost_category }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @cost_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /cost_categories/1
  # PATCH/PUT /cost_categories/1.json
  def update
    respond_to do |format|
      if @cost_category.update(cost_category_params)
        format.html { redirect_to cost_categories_url, notice: 'Cost category was successfully updated.' }
        format.json { render :show, status: :ok, location: @cost_category }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @cost_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /cost_categories/1
  # DELETE /cost_categories/1.json
  def destroy
    @cost_category.destroy
    respond_to do |format|
      format.html { redirect_to cost_categories_url, notice: 'Cost category was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_cost_category
      @cost_category = CostCategory.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def cost_category_params
      params.require(:cost_category).permit(:name, :month_limit, :description)
    end
end
