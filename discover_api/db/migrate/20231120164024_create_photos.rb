class CreatePhotos < ActiveRecord::Migration[7.0]
  def change
    create_table :photos do |t|
      t.text :photo_url
      t.binary :photo_date
      t.timestamps
    end
    create_table :companies_photos do |t|
      t.belongs_to :company
      t.belongs_to :photo
      t.timestamps
    end
  end
end
