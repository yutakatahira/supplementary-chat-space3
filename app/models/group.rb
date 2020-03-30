class Group < ApplicationRecord
  has_many :users, through: :group_users
  has_many :group_users
  has_many :messages

  validates :name, presence: true

  def latest_message
    latest_messages = messages.last
    if latest_messages.present?
      latest_messages.message
    else
      "投稿はありません。"
    end
  end
end
