require 'test_helper'

class CostCategoriesControllerTest < ActionController::TestCase
  setup do
    @cost_category = cost_categories(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:cost_categories)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create cost_category" do
    assert_difference('CostCategory.count') do
      post :create, cost_category: {  }
    end

    assert_redirected_to cost_category_path(assigns(:cost_category))
  end

  test "should show cost_category" do
    get :show, id: @cost_category
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @cost_category
    assert_response :success
  end

  test "should update cost_category" do
    patch :update, id: @cost_category, cost_category: {  }
    assert_redirected_to cost_category_path(assigns(:cost_category))
  end

  test "should destroy cost_category" do
    assert_difference('CostCategory.count', -1) do
      delete :destroy, id: @cost_category
    end

    assert_redirected_to cost_categories_path
  end
end
