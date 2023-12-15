class AddTourToReservations < ActiveRecord::Migration[7.0]
  def change
    add_reference :reservations, :tour, null: false, foreign_key: true
  end
end
