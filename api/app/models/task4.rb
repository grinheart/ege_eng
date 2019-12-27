class Task4 < ApplicationRecord
  validates :question, presence: true
  has_one_attached :image
end
