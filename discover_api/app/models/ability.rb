class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (si el usuario no ha iniciado sesión)

    if user.admin? || user.company?
      can :create, Tour
      can :destroy, Tour
    end
  end
end
