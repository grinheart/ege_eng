require 'test_helper'

class SignControllerTest < ActionDispatch::IntegrationTest
  test "should get in" do
    get sign_in_url
    assert_response :success
  end

  test "should get up" do
    get sign_up_url
    assert_response :success
  end

  test "should get out" do
    get sign_out_url
    assert_response :success
  end

end
