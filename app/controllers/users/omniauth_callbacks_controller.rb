module Users
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def google_oauth2
      # You need to implement the method below in your model (e.g. app/models/user.rb)
      @user = User.from_omniauth(
        request.env['omniauth.auth'].info['email'],
        request.env['omniauth.auth'].info['image']
      )

      if @user
        flash[:notice] = I18n.t 'devise.omniauth_callbacks.success', kind: 'Google'

        sign_in_and_redirect @user, event: :authentication
      else
        session['devise.google_data'] = request.env['omniauth.auth'].except('extra')

        redirect_to new_user_session_url, alert: 'User not found.'
      end
    end
  end
end