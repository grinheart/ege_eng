require 'test_helper'

class StudentWorkspaceControllerTest < ActionDispatch::IntegrationTest
  test "should get task" do
    get student_workspace_task_url
    assert_response :success
  end

end
