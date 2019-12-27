class AddTaskSeriesIdToStudent < ActiveRecord::Migration[5.2]
  def change
    add_column :students, :task_series_id, :integer
  end
end
