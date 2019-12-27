class TaskSeries < ApplicationRecord
  has_one :student
  has_many :taskRecords
  validates :key, uniqueness: true
end
