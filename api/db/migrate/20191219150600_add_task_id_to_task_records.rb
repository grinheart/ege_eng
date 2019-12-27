class AddTaskIdToTaskRecords < ActiveRecord::Migration[5.2]
  def change
    add_column :task_records, :task_id, :integer
  end
end
