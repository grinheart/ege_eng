require_relative './token_controller.rb'
class TeacherWorkspaceController < ApplicationController
  include TokenController
  before_action :fail_if_not_teacher

  def create_invitation
      if not @access
        render json: @response
        return
      end

      inv = Invitation.new(number: rand(899999) + 100000, teacher: Teacher.find_by(id: @id))
      if inv.save
        success
        @response[:number] = inv.number
        puts 'success'
        puts @response
      end

      render json: @response
  end

  def create_task
    puts 'start'
    puts params.inspect
      if not @access
        puts 'access denied'
        render json: @response
        return
      end

      task_number = params[:number].to_i
      puts 'task_number' + task_number.to_s

      case task_number
      when 1
        puts 'here'
        if params[:text].nil?
          render json: @response
          return
        else
          t = Task1.new(text: params[:text])
        end

      when 2
          if params[:explanation].nil? || params[:questions].nil? || params[:promo].nil?
            render json: @response
          end
          questions = params[:questions].split("\n").map { |q|
            q.gsub(/^[1-5]([\)\.]*)(\s*)/, '')
          }
          if questions.length != 5
            render json: @response
          end
          questions = questions.join("\n")
          puts 'questions'
          puts questions
          t = Task2.new(questions: questions, problem: params[:explanation], promo: params[:promo])
          t.image = params[:image_file]
      when 3

      when 4

      else
        render json: @response
        return
      end

      if t.save
        success
        puts 'success'
        puts @response
      end

      render json: @response
  end

  def fail_if_not_teacher
      fail_if_not('Teacher')
  end
end
