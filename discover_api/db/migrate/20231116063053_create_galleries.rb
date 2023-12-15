class CreateGalleries < ActiveRecord::Migration[7.0]
  def change
    create_table :galleries do |t|
      t.text :photo_path, null: true
      t.binary :photo_data, null: true
      t.timestamps
    end
    create_table :galleries_tours do |t|
      t.belongs_to :tour
      t.belongs_to :gallery
      t.timestamps
    end
  end
end