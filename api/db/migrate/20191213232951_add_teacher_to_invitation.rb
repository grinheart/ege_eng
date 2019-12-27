class AddTeacherToInvitation < ActiveRecord::Migration[5.2]
  def change
    add_column :invitations, :teacher, :has_one
  end
end
