class AddTeacherToStudent < ActiveRecord::Migration[5.2]
  def change
    add_column :students, :teacher, :has_one
  end
end
