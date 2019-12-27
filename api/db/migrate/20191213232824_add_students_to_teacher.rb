class AddStudentsToTeacher < ActiveRecord::Migration[5.2]
  def change
    add_column :teachers, :students, :has_many
  end
end
