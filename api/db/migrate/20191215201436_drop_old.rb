class DropOld < ActiveRecord::Migration[5.2]
  def change
    drop_table :task2s
    drop_table :task4s
  end
end
