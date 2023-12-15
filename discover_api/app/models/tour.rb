class Tour < ApplicationRecord
    has_many :reservations
    has_and_belongs_to_many :companies
    has_and_belongs_to_many :galleries
    accepts_nested_attributes_for :galleries
    validates :ubication, presence: true 
    validates :name, presence: true
    validates :description, presence: true
    validates :price, presence: true
    accepts_nested_attributes_for :galleries

    has_many_attached :images
end
