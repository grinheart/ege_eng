class Task1 < ApplicationRecord
  validates :text, uniqueness: true
  validates :text, presence: true

  def payload
      text
  end
end
