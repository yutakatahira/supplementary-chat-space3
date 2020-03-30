class MessagesController < ApplicationController
  before_action :set_group, only: %i(index create)

  def index
    @groups = current_user.groups
    @messages = @group.messages.includes(:user)
    @message = Message.new
    respond_to do |format|
      format.html
      format.json { @new_message = @messages.where('id > ?', params[:id])  }
    end
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group) }
        format.json
      end
    else
      flash.now[:alert] = "メッセージを入力してください"
      render :index
    end
  end

  private
  def message_params
    params.require(:message).permit(:message).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
