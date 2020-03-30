class UsersController < ApplicationController
  def new
    @users = User.where('name LAKE(?)', "%#{params[:keyword]}").where.not(name: params[:name])
    respond_to do |format|
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path, notice: "ユーザー情報の更新に成功しました"
    else
      render :edit, alert: "ユーザー情報の更新に失敗しました"
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :email)
  end
end
