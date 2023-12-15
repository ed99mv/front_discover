class Company < ApplicationRecord
    has_and_belongs_to_many :users
    has_and_belongs_to_many :tours
    accepts_nested_attributes_for :users
    has_many_attached :images
end
