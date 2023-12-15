class CreateTours < ActiveRecord::Migration[7.0]
  def change
    create_table :tours do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.integer :price, null: false
      t.timestamps
    end
  end
end

