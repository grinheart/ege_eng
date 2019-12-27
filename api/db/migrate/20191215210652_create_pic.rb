class CreatePic < ActiveRecord::Migration[5.2]
  def change
    create_table :pics do |t|
      t.string :filename
      t.string :content_type
      t.binary :data
    end
  end
end
