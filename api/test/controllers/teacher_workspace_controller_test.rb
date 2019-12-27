require 'test_helper'

class TeacherWorkspaceControllerTest < ActionDispatch::IntegrationTest
  test "should get create_invitation" do
    get teacher_workspace_create_invitation_url
    assert_response :success
  end

end
