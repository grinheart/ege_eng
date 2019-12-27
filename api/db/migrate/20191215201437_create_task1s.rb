class CreateTask1s < ActiveRecord::Migration[5.2]
  def change
    create_table :task1s do |t|
      t.string :text
    end
  end
end
