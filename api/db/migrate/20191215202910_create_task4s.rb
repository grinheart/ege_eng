class CreateTask4s < ActiveRecord::Migration[5.2]
  def change
    create_table :task4s do |t|
      t.string :question
    end
  end
end
