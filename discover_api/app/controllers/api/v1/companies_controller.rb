class Api::V1::CompaniesController < ApplicationController
  before_action :set_company, only: %i[ show update destroy associated_tours ]

  # GET /companies
  def index
    @companies = Company.all

    companies_with_images = @companies.map do |company|
      {
        id: company.id,
        name: company.name,
        description: company.description,
        ubication: company.ubication,
        images: company.images.map { |image| rails_blob_url(image) }
      }
    end

    render json: companies_with_images
  end

  # GET /companies/1
  def show
    company_images = @company.images.map { |image| url_for(image) }
  
    render json: {
      id: @company.id,
      name: @company.name,
      description: @company.description,
      ubication: @company.ubication,
      images: company_images
    }
  end

  # POST /companies
  def create
    jwt_token = request.headers['Authorization']&.split(' ')&.last

    if jwt_token
      decoded_token = JWT.decode(jwt_token, Rails.application.credentials.devise_jwt_secret_key).first
      user_id = decoded_token['sub']
      user = User.find_by(id: user_id)

      @company = Company.new(company_params)

      if user && @company.save
        user.companies << @company
        render json: @company, status: :created
      else
        render json: { error: 'Usuario no encontrado o error al guardar la compañía' }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Token inválido' }, status: :unprocessable_entity
    end
  rescue JWT::DecodeError => e
    render json: { error: 'Token inválido' }, status: :unprocessable_entity
  end
  

  # PATCH/PUT /companies/1
  def update
    if @company.update(company_params)
      render json: @company
    else
      render json: @company.errors, status: :unprocessable_entity
    end
  end

  # DELETE /companies/1
  def destroy
    begin
      Company.transaction do
        @company.tours.each do |tour|
          puts "Eliminando tour: #{tour.name}"
          tour.destroy
        end
        puts "Tours eliminados"
        
        @company.destroy
        render json: { message: 'Compañía y tours asociados eliminados correctamente' }, status: :ok
      end
    rescue => e
      render json: { error: 'Error al eliminar la compañía y los tours asociados' }, status: :unprocessable_entity
    end
  end

  def associated_tours
    tours = @company.tours.as_json(only: [:id, :name, :description, :price, :ubication])
  
    tours_with_images = tours.map do |tour|
      tour['images'] = @company.tours.find(tour['id']).images.map { |image| rails_blob_url(image) }
      tour
    end
  
    render json: tours_with_images
  end
  

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_company
      @company = Company.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def company_params
      params.require(:company).permit(:name, :description, :ubication, images: [])
    end

    def get_company_tours(company)
      company.tours
    end
end
