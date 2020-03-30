require 'rails_helper'

describe Message, type: :model do
  describe '#create' do
    context 'can save' do
      it "is valid with a message" do
        message = build(:message, image: nil)
        message.valid?
        expect(message).to be_valid
      end

      it "is valid with an image" do
        message = build(:message, message: nil)
        expect(message).to be_valid
      end

      it "is valid with an image and message" do
        message = build(:message)
        expect(message).to be_valid
      end
    end

    context 'can not save' do
      it "is invalid without message and image" do
        message = build(:message, message: nil, image: nil)
        message.valid?
        expect(message.errors[:message]).to include('を入力してください')
      end


      it "is invalid without group_id" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include()
      end

      it "is invalid without user_id" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include()
      end
    end
  end
end
