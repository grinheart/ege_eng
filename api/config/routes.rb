Rails.application.routes.draw do
  get 'student_workspace/task'
  get 'teacher_workspace/create_invitation'
  post 'sign_in', to: 'sign#in'
  post 'sign_up', to: 'sign#up'
  post 'sign_out', to: 'sign#out'
  post 'user_exists', to: 'sign#user_exists'
  post 'invitation_exists', to: 'sign#invitation_exists'
  post 'token', to: 'sign#send_token'
  post 'user_type', to: 'sign#user_type'
  post 'create_task', to: 'teacher_workspace#create_task'
  post 'create_invitation', to: 'teacher_workspace#create_invitation'
  post 'start_task', to: 'student_workspace#start_task'
  post 'task', to: 'student_workspace#task'
  get 'task', to: 'student_workspace#task'

  get 'config/retrieve_tasks', to: 'admin#retrieve_tasks'
  get 'config/update_tasks', to: 'admin#update_tasks'
end
