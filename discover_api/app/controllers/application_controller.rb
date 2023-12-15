class ApplicationController < ActionController::API


  private

    before_action :update_allowed_parameters, 
    if: :devise_controller? 
    protected 
    def update_allowed_parameters
        devise_parameter_sanitizer.permit( :sign_up ) { |u| u.permit( :full_name, :email, :phone_number, :country, :password, :reset_password_token, :reset_password_sent_at, :remember_created_at )}
        devise_parameter_sanitizer.permit( :account_update ) { |u| u.permit( :full_name, :email, :phone_number, :country, :password , :current_password, :reset_password_token, :reset_password_sent_at, :remember_created_at )}
    end 

    def set_current_user
      @current_user = current_user
    end

    def pundit_user
      current_user
    end
  
    def user_not_authorized
      redirect_to root_path, notice: 'You don\'t have permissions to access this area'
    end
end
