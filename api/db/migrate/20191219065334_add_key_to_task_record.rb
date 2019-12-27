class AddKeyToTaskRecord < ActiveRecord::Migration[5.2]
  def change
    add_column :task_records, :key, :string
  end
end
