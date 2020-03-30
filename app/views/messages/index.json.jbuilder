json.array! @new_message do |message|
  json.name   message.user.name
  json.group_name message.group.name
  json.text   message.message
  json.image  message.image.url
  json.id     message.id
  json.group_id message.group.id
  json.created_at   message.created_at.strftime("%Y-%m-%d　%H:%M")
end
