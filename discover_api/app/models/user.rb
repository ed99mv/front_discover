class User < ApplicationRecord
  rolify

  has_and_belongs_to_many :reservations
  accepts_nested_attributes_for :reservations
  has_and_belongs_to_many :companies
  
  include Devise::JWT::RevocationStrategies::JTIMatcher
  devise :database_authenticatable, :registerable,
         :recoverable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self
end
