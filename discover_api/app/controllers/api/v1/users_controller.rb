class Api::V1::UsersController < ApplicationController
  before_action :set_current_user
    include Rolify
    before_action :set_user, only: %i[ show update destroy get_user_role change_role ]
    def index
        @users = User.all
        render json: @users.to_json(except: [:created_at, :updated_at, :jti])
    end
    # GET /users/1
    def show
      render json: @user.to_json(except: [:created_at, :updated_at, :jti])
    end
  
    def get_user_role
      user_role = @user.roles.first.name if @user.roles.any?

      render json: { role: user_role }
    end
    
    def change_role
      new_role = params[:role]
      puts "New role received: #{new_role}" # Verifica el valor de new_role
      
      if @user.present? && new_role.present? && (@user.has_role?(:admin) || @user.has_role?(:company) || @user.has_role?(:user))
        puts "User present and role valid #{@user}" # Comprobación si el usuario está presente y el rol es válido
    
        # Eliminar roles anteriores (en caso de que solo deba tener uno)
        @user.roles.destroy_all
        puts "User roles destroyed" # Verifica si los roles anteriores se eliminaron correctamente
    
        # Asignar el nuevo rol al usuario
        @user.add_role new_role
        puts "New role added to user" # Verifica si se agrega correctamente el nuevo rol al usuario
    
        render json: { message: 'Role changed successfully' }
      else
        puts "Invalid parameters or insufficient permissions" # Verifica si hay errores de parámetros o permisos insuficientes
        render json: { error: 'Invalid parameters or insufficient permissions' }, status: :unprocessable_entity
      end
    end
    # POST /users
    # def create
    #   @user = User.new(user_params)

    #   if @user.save
    #     render json: @user, status: :created
    #   else
    #     render json: @user.errors, status: :unprocessable_entity
    #   end
    # end

  
    # PATCH/PUT /users/1
    # def update
    #   if @user.update(user_params)
    #     render json: @user
    #   else
    #     render json: @user.errors, status: :unprocessable_entity
    #   end
    # end
  
    # DELETE /users/1
    # def destroy
    #   @user.destroy
    # end
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_user
        @user = User.find(params[:id])
      end
  
      # Only allow a list of trusted parameters through.
      def user_params
        params.require(:user).permit(:full_name, :email, :phone_number, :country, :password, :password_confirmation)
      end
  end