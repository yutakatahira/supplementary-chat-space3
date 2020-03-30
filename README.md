# chat-space2

## table & model

**channel**

|Column|Type|null|
|:--:|:--:|:--:|
|name|string|false|

**association**
- has_many :messages
- has_many :users, through: :channel_users
- has_many :channel_users
- belongs_to :workspace

**workspace**

|Column|Type|null|
|:--:|:--:|:--:|
|name|string|false|

**association**
- has_many :channels
- has_many :users
- has_many :messages

**user**

|Column|Type|null|
|:--:|:--:|:--:|
|name|string|false|

**association**
- has_many :messages
- has_many :channels, through: :channel_users
- has_many :channel_users
- belongs_to :workspace

**channel_users**

|Column|Type|null|
|:--:|:--:|:--:|
|channel_id|references|false|
|user_id|references|false|

**association**
- belongs_to :user
- belongs_to :channel

**message**

|Column|Type|null|
|:--:|:--:|:--:|
|message|text||
|image|text||
|channel_id|references|false|
|user_id|references|false|

**association**
- belongs_to :user
- belongs_to :channel
- belongs_to :workspace
