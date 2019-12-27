class AddSKeyToTaskRecord < ActiveRecord::Migration[5.2]
  def change
    add_column :task_records, :s_key, :string
  end
end
