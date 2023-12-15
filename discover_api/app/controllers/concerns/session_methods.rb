module SessionMethods
    extend ActiveSupport::Concern
  
    included do
      helper_method :current_user 
    end
  
    private
  
    def current_user
      @current_user ||= User.find_by(id: session[:user_id])
    end
end
  