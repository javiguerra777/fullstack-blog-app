class UsersController < ApplicationController
  def create
    @user = User.create(user_params)
    if @user.save
      render json: {
        data: @user
      }, :status => 200
    else
      render json: {
        data: "Unable to create user"
      }, :status => 400
    end
  end

  def login
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      render json: {
        user: @user
      }, @status => 200
    else
      render json: {
        data: "Email or Password is invalid"
      }, :status => 400
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :profile_picture)
  end
end
