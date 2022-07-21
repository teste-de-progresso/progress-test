module Users
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def google_oauth2
      # You need to implement the method below in your model (e.g. app/models/user.rb)
      @user = User.find_by!(email: request.env['omniauth.auth'].info['email'])

      flash[:notice] = I18n.t 'devise.omniauth_callbacks.success', kind: 'Google'
      sign_in_and_redirect @user, event: :authentication
    rescue ActiveRecord::RecordNotFound => e
      # Removing extra as it can overflow some session stores
      session['devise.google_data'] = request.env['omniauth.auth'].except('extra')

      redirect_to new_user_registration_url, alert: e.message
    end
  end
end