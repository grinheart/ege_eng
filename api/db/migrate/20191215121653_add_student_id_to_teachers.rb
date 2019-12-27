class AddStudentIdToTeachers < ActiveRecord::Migration[5.2]
  def change
    add_column :teachers, :student_id, :integer
  end
end
