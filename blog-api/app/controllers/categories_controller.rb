class CategoriesController < ApplicationController
  def index
    @categories = Category.all()
    render json: {
      data: @categories
    }, :status => 200
  end

  def create
    @category = Category.create(category_params)
    if @category.save
      render json: {
        data: @category
      }
    else
      render json: {
        data: "Unable to save category"
      }, :status => 400
    end
  end
  private
  def category_params
    params.permit(:category)
  end
end
