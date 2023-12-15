class CreateReservations < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations do |t|
      t.string :full_name, null: true
      t.string :email,             null: false, default: ""
      t.string :phone_number, null: true
      t.integer :amount_people, null: true
      t.timestamps
    end
    create_table :reservations_users do |t|
      t.belongs_to :user
      t.belongs_to :reservation
      t.timestamps
    end
  end
end
