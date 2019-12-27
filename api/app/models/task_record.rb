class TaskRecord < ApplicationRecord
  has_one_attached :audio
  validates :key, uniqueness: true
  validates :task_id, presence: true

  def task
     Object.const_get("Task#{number}").find_by(id: task_id)
  end

  def task=(t)
     task_id = t.id
     number = t.class.name[-1].to_i
  end

end
