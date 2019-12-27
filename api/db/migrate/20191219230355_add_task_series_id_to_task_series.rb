class AddTaskSeriesIdToTaskSeries < ActiveRecord::Migration[5.2]
  def change
    add_column :task_series, :task_series_id, :integer
  end
end
