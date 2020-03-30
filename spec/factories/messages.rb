FactoryGirl.define do
  factory :message do
    message       { Faker::Lorem.sentence }
    image         { File.open("#{Rails.root}/public/uploads/message/image/14/LGTM1.png") }
    user
    group
  end
end
