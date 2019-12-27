class Invitation < ApplicationRecord
  has_one :teacher
  validates :number, presence: true
  validates :teacher, presence: true
end
