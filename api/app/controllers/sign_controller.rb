require 'jwt'
require_relative './cfg.rb'
require_relative './token_controller.rb'


class SignController < ApplicationController
  include TokenController

  before_action :receive_token, only: [:up, :in, :out, :send_token, :user_type]
  before_action :define_user, only: [:up, :in, :user_exists, :user_type]

  def send_response
        #@response[:params] = params
        cookies[:token_] = @token
        render json: @response
  end

    def in
        if is_auth
            @response[:status] = 'auth'
            send_response
            return
        end

        id = @user.auth(params[:email], params[:pwd])
        if id.nil?
           @response[:status] = 'fail'
        else
           create_token(id, @user.name)
           @response[:status] = 'success'
        end

        send_response
   end

   def up
     puts 'up'
     puts params.inspect
     @response = {:status => 'fail'}

     if is_auth
         @response[:status] = 'auth'
         send_response
         return
     end

     invitation_number = params[:invitation].to_i
     if (@user == Student && Invitation.find_by(number: invitation_number).nil?)
       send_response
       return
     end

     user = @user.create(params[:email], params[:pwd])
     if user.save
       @response[:status] = 'success'
       create_token(user.id, @user.name)
       puts "token created: #{@user.name}"

       if (@user == Student)
         inv =  Invitation.find_by(number: invitation_number)
         puts inv.inspect
         teacher = inv.teacher
         p teacher
         user.teacher = teacher
         user.save
         inv.destroy
       end
     end

     send_response
   end

  def out
    clear_token
    send_response
  end

  def user_exists
    render json: {"response" => (!@user.find_by(email: params[:email]).nil?)}
  end

  def user_type
    puts 'user_type'
    puts @user.name
    render json: {"type" => @user.name}
  end

  def send_token
        @response["token"] = ((@token != '') && (!@token.nil?))
        send_response
  end

  def invitation_exists
      render json: {"response" => !Invitation.find_by(number: params[:invitation].to_i).nil?}
  end

  def define_user
         user = nil

         if has_token
           user = token_payload["user"]
         else
           user = params[:user]
         end

         puts 'define_user'
         puts user
         if (user == 'Teacher')
           @user = Teacher
         else
           @user = Student
         end
  end

end
