class Task2 < ApplicationRecord
  validates :questions, :problem, presence: true
  has_one_attached :image

  def payload    
    {
      :questions => self.questions.split("\n"),
      :problem => self.problem,
      :image => url_for(self.image),
      :promo => self.promo
    }
  end
end
