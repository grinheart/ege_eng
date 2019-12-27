class AddAssociations < ActiveRecord::Migration[5.2]
  def change
    add_column :teachers, :invitation_id, :integer
    add_column :students, :teacher_id, :integer
    add_column :invitations, :teacher_id, :integer
  end
end
