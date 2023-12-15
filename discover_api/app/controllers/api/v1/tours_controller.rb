class Api::V1::ToursController < ApplicationController
  # load_and_authorize_resource
  before_action :set_tour, only: %i[ show update destroy galleries companies company_id user_email_for_tour]
  # GET /tours
  def index
    @tours = Tour.all

    tours_with_images = @tours.map do |tour|
      {
        id: tour.id,
        name: tour.name,
        description: tour.description,
        price: tour.price,
        ubication: tour.ubication,
        images: tour.images.map { |image| rails_blob_url(image) }
      }
    end

    render json: tours_with_images
  end

  # GET /tours/1
  def show
    tour_images = @tour.images.map { |image| url_for(image) }
    company_id = @tour.companies.first.id 
  
    render json: {
      id: @tour.id,
      name: @tour.name,
      description: @tour.description,
      price: @tour.price,
      ubication: @tour.ubication,
      company_id: company_id,
      images: tour_images
    }
  end
  

  # POST /tours
  def create
    @tour = Tour.new(tour_params)
    
    if @tour.save
      company_id = params[:tour][:company_id]
      @tour.companies << Company.find(company_id)
  
      company = @tour.companies.first
      company_details = { id: company.id, name: company.name } 
  
      render json: { tour: @tour, company: company_details }, status: :created
    else
      render json: @tour.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tours/1
  def update
    if @tour.update(tour_params)
      render json: @tour
    else
      render json: @tour.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tours/1
  def destroy
    if tour_belongs_to_authenticated_user(@tour)
      
      if @tour.destroy
        render json: { message: 'Tour eliminado correctamente' }, status: :ok
      else
        render json: { error: 'Error al eliminar el tour' }, status: :unprocessable_entity
      end
    else
      render json: { error: 'No tienes permiso para eliminar este tour' }, status: :unauthorized
    end
  end
  

  def companies
    companies = @tour.companies

    render json: companies.to_json(except: [:created_at, :updated_at]), status: :ok
  end

  def company_id
    @company = @tour.companies.first # Busca la pertenencia 
    render json: @company.to_json(only: [:id, :name])
  end
  
  def user_companies #Obtengo las compañías del usuario loggeado
    jwt_token = request.headers['Authorization']&.split(' ')&.last

    if jwt_token
      decoded_token = JWT.decode(jwt_token, Rails.application.credentials.devise_jwt_secret_key).first
      user_id = decoded_token['sub']
      user = User.find_by(id: user_id)

      if user
        user_companies = user.companies
        render json: { userCompanies: user_companies }
      else
        render json: { error: 'Usuario no encontrado' }, status: :not_found
      end
    else
      render json: { error: 'Token no proporcionado' }, status: :unauthorized
    end
  rescue JWT::DecodeError => e
    render json: { error: 'Token inválido' }, status: :unprocessable_entity
  end

  def user_companies_with_tours
    jwt_token = request.headers['Authorization']&.split(' ')&.last

    if jwt_token
      decoded_token = JWT.decode(jwt_token, Rails.application.credentials.devise_jwt_secret_key).first
      user_id = decoded_token['sub']
      user = User.find_by(id: user_id)

      if user
        user_companies_with_tours = user.companies.includes(:tours)
        render json: { userCompaniesWithTours: user_companies_with_tours.as_json(include: { tours: { only: [:id, :name, :description] } }) }
      else
        render json: { error: 'Usuario no encontrado' }, status: :not_found
      end
    else
      render json: { error: 'Token no proporcionado' }, status: :unauthorized
    end
  rescue JWT::DecodeError => e
    render json: { error: 'Token inválido' }, status: :unprocessable_entity
  end

  def user_email_for_tour
    # Obtener la compañía asociada a este tour
    company = @tour.companies.first

    # Obtener los usuarios asociados a esta compañía
    users = company.users

    # obtener el email del usuario
    user_email = users.first.email if users.present?

    # Renderizar el email del usuario como respuesta
    render json: { email: user_email }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tour
      @tour = Tour.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def tour_params
      params.require(:tour).permit(:name, :description, :price, :ubication, images: [], company_id: :integer)
    end
    
    def tour_belongs_to_authenticated_user(tour)
      jwt_token = request.headers['Authorization']&.split(' ')&.last

      if jwt_token
        decoded_token = JWT.decode(jwt_token, Rails.application.credentials.devise_jwt_secret_key).first
        user_id = decoded_token['sub']
        user = User.find_by(id: user_id)
    
        return false unless user.present?
    
        # Obtener las compañías asociadas al usuario
        user_companies = user.companies.includes(:tours)
    
        # Verificar si alguna de las compañías del usuario contiene el tour
        user_companies.each do |company|
          return true if company.tours.include?(tour)
        end
      end
    
      false
    rescue JWT::DecodeError => e
      false
    end
  
end
