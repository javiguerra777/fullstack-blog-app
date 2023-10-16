class PostsController < ApplicationController
 def index
  @posts = Post.joins(:user).select('posts.id, title, body, username, user_id, email, profile_picture, category, posts.created_at').all
  render json: {
    data: @posts
  }, :status => 200
 end

 def show
  @post = Post.find(params[:id])
  if @post.present?
    render json: {
      data: @post
    }, :status => 200
  else
    render json: {
      data: "Unable to find post"
    }, :status => 404
  end
 end

 def create
  @post = Post.create(post_params)
  if @post.save
    render json: {
      data: @post
    }, :status => 200
  else
    render json: {
      data: "Unable to create post"
    }, :status => 400
  end
 end

 def update
  @post = Post.find_by(id: params[:id], user_id: params[:user_id])
  if @post && @post.update(update_params)
    render json: {
      data: @post
    }
  else
    render json: {
      data: "Unable to update post"
    }
  end
 end

 def destroy
  @post = Post.find_by(id: params[:id], user_id: params[:user_id])
  if @post && @post.destroy
    render json: {
      data: "Post was successfully deleted"
    }, :status => 200
  else
    render json: {
      data: "Unable to delete post"
    }, :status => 400
  end
 end

 private
 def post_params
  params.require(:post).permit(:title, :body, :category, :user_id)
 end
 def update_params
  params.require(:post).permit(:title, :body, :user_id)
 end
end
