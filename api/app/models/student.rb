class Student < ApplicationRecord
  include BCrypt

  validates :email, presence: true
  validates :email, uniqueness: true

  validates :password, presence: true

  def self.invalid_email(email)
     return false;
  end

  def self.invalid_pwd(pwd)
     return false;
  end

  def self.create_hash(pwd)
      Password.create(pwd)
  end

  def self.create(email, pwd)
       if (invalid_email(email) || invalid_pwd(pwd))
          return false
       end
      self.new({:email => email, :password => self.create_hash(pwd)})
  end

  def self.auth(email, pwd)
      user = self.find_by(email: email)
      if (user == nil)
        return nil
      elsif Password.new(user.password) != pwd
          return nil
      end
      return user.id
  end

  has_one :teacher
end
