class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :full_name, :email, :phone_number, :country
end
