class AddUbicationToTours < ActiveRecord::Migration[7.0]
  def change
    add_column :tours, :ubication, :string
  end
end
