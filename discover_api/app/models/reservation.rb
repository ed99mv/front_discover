class Reservation < ApplicationRecord
    has_and_belongs_to_many :users
    accepts_nested_attributes_for :users
    belongs_to :tour
end
