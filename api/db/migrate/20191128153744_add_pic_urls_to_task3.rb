class AddPicUrlsToTask3 < ActiveRecord::Migration[5.2]
  def change
    add_column :task3s, :pic_urls, :string
  end
end
