# README



## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
### Association
- has_many :members
- has_many :groups, through: :members
- has_many :posts


## groupテーブル
|Column|Type|Options|
|------|----|-------|
|groupname|text|null: false|
### Association
- has_many :users, through: :members
- has_many  :posts



## commentテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|image|text|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group
