# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  avatar_url             :string
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  name                   :string           not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  roles                  :string           default([]), is an Array
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
class User < ApplicationRecord
  extend Enumerize

  devise :database_authenticatable,
         :recoverable,
         :rememberable,
         :validatable,
         :omniauthable,
         omniauth_providers: [:google_oauth2]

  enumerize :roles,
            multiple: true,
            default: :teacher,
            in: %i[admin nde coordinator center_director pro_rector teacher]

  validates :name, presence: true

  before_validation :set_random_password, on: :create


  roles.values.each do |role|
    define_method "#{role}?" do
      roles.include?(role)
    end
  end

  def self.from_omniauth(email, avatar_url)
    User.find_by(email: email).tap do |user|
      user.update(avatar_url: avatar_url) unless user.nil?
    end
  end

  private

  def set_random_password
    self.password = SecureRandom.alphanumeric
  end
end
