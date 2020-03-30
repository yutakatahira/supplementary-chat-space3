require 'rails_helper'

describe MessagesController, type: :controller do
    let(:user) { create(:user) }
    let(:group) { create(:group) }
    before do
      login_user user
      get :index, id: {group: group.id}
    end

    describe "GET #index" do
      it "assigns groups to @groups" do
        expect(assigns(:group)).to eq group
      end

      it "assigns message to @message" do
        expect(assigns(:message)).to be_a_new(:message)
      end

      it "renders the :index template" do
        expect(response).to render_template :index
      end
    end
  end
end
