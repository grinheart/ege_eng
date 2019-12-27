require_relative './cfg.rb'
module TokenController
    def receive_token
         @token = cookies[:token_]
         p 'receive token'
         p token_payload.inspect
         if token_payload.nil?
           cookies[:token_] = nil
           @token = nil
         end
         @response = {}
      end

      def set_token(token)
        @token = token
      end

      def clear_token
          @token = nil
      end

      def has_token
           !@token.nil?
      end

      def create_token(id, user)
          set_token(JWT.encode({:id => id, :user => user},
                    SECRET_KEY,
                    ENCRYPTION_ALGORITHM))
      end

      def token_payload
        begin
          puts JWT.decode(@token,
                   SECRET_KEY,
                   true,
                  { :algorithm => ENCRYPTION_ALGORITHM })[0]

          return JWT.decode(@token,
                   SECRET_KEY,
                   true,
                  { :algorithm => ENCRYPTION_ALGORITHM })[0]
        rescue
          return nil
        end
      end

      def is_auth
        puts 'is_auth'
         puts token_payload
          if has_token
             return true
          else
             return false
          end
      end

      def success
        @response[:status] = 'success'
      end

      def fail_if_not(user)
          @response = {:status => 'fail'}
          @access = false
          receive_token
          if not is_auth
            puts 'not auth'
            puts token_payload.inspect
            return
          end
          t = token_payload
          if t["user"] != user
            return
          end
          @access = true
          @id = t["id"]
      end
end
