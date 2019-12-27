class ChangeUsersToStudents < ActiveRecord::Migration[5.2]
  def change
    rename_table :users, :students
  end
end
