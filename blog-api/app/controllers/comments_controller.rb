class CommentsController < ApplicationController
  def show
    @comments = Comment.joins(:user).select('comments.id, comment, username, user_id, email, profile_picture, comments.created_at').where("comments.post_id == #{params[:id]}").all
    render json: {
      data: @comments
    }, :status => 200
  end
  def create
    @post = Post.find(params[:post_id])
    @comment = Comment.create(comment_params)
    if @post && @comment.save
      @found_comment = Comment.joins(:user).select('comments.id, comment, username, user_id, email, profile_picture, comments.created_at').find_by(id: @comment.id)
      render json: {
        data: @found_comment
      }, :status => 200
    else 
      render json: {
        data: "Unable to post comment"
      }, :status => 400
    end
  end
  def destroy
    @comment = Comment.find_by(id: params[:id], user_id: params[:user_id])
    if @comment && @comment.destroy
      render json: {
        data: "Comment was successfully deleted"
      }, :status => 200
    else 
      render json: {
        data: "Unable to delete comment"
      }
    end
  end

  private
  def comment_params
    params.permit(:comment, :user_id, :post_id)
  end
end