class StudentWorkspaceController < ApplicationController
  include TokenController
  before_action :fail_if_not_student

  def start_task
      if not @access || (not params[:series_key].nil?) #replace with a block?
        render json: @response
      return
     else
       success
       series_key = new_key
     end

     series = TaskSeries.new(key: series_key, student: Student.find_by(id: token_payload['id']))

     @response['series_key'] = series_key

     @response['task_ids'] = Array((1..2)).map { |number|
       cur_task = Object.const_get("Task#{number}")
       offset = rand(cur_task.count)
       task   = cur_task.offset(offset).first

       task.id
     }

     render json: @response
  end

  def task
      if not @access || params[:series_key].nil? || params[:number].nil? || params[:id].nil?
        render json: @response
        return
      elsif params[:record_key].nil?
           rec_key = new_key
           rec = TaskRecord.new(key: rec_key, number: params[:number], task_id: params[:id])
           if rec.save
             success
             @response[:record_key] = rec_key
             @response[:task] = rec.task.payload
             puts 'response payload'
             puts @response
           end
      else
        rec = TaskRecord.find_by(key: params[:record_key])
        if rec.nil? || rec.student.id != token_payload['id'] || params[:audio].nil?
          render json: @response
          return
        else
            rec.audio = params[:audio]
            success
        end
      end
      render json: @response
  end


  def fail_if_not_student
      fail_if_not('Student')
  end

  def new_key
      Array((10..rand(20)+10)).map do |c|
        (rand(60)+33).chr
      end.join('')
  end
end
