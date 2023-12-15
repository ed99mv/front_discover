class CreateCompanies < ActiveRecord::Migration[7.0]
  def change
    create_table :companies do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.text :ubication, null: false
      t.timestamps
    end
    create_table :companies_tours do |t|
      t.belongs_to :company
      t.belongs_to :tour
      t.timestamps
    end
    create_table :companies_users do |t|
      t.belongs_to :user
      t.belongs_to :company
      t.timestamps
    end
  end
end
