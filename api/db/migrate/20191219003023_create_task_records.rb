class CreateTaskRecords < ActiveRecord::Migration[5.2]
  def change
    create_table :task_records do |t|
      t.integer :number

      t.timestamps
    end
  end
end
