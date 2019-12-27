class CreateTask2s < ActiveRecord::Migration[5.2]
  def change
    create_table :task2s do |t|
      t.string :questions
      t.string :promo
      t.string :problem
    end
  end
end
