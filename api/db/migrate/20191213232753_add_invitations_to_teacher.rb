class AddInvitationsToTeacher < ActiveRecord::Migration[5.2]
  def change
    add_column :teachers, :invitations, :has_many
  end
end
