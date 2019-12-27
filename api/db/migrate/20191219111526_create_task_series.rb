class CreateTaskSeries < ActiveRecord::Migration[5.2]
  def change
    create_table :task_series do |t|
      t.string :key
    end
  end
end
