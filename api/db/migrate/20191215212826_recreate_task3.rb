class RecreateTask3 < ActiveRecord::Migration[5.2]
  def change
    drop_table :task3s
    create_table :task3s
  end
end
