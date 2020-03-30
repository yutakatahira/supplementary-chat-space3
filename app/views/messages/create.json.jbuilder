json.id @message.id
json.group_id @message.group.id
json.group_name @message.group.name
json.text @message.message
json.name @message.user.name
json.created_at @message.created_at.strftime("%Y-%m-%d　%H:%M")
json.image @message.image.url
