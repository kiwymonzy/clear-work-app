// providers/AuthProvider.js
import Config from '../Utls/Config';

class AuthProvider {
  // LOGIN
  static async login(credentials) {
    if (credentials.email !== '' && credentials.password !== '') {
      try {
        const response = await fetch(Config.LOGIN_URL, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const res = await response.json();
        //console.log(res);
        return res;
      } catch (error) {
        console.error('Login error:', error);
        throw error; // Handle failed login
      }
    } else {
      const errorObject = {
        message: 'Fields empty',
      };
      console.log(errorObject);
      return errorObject; // Handle empty fields
    }
  }

  // REGISTER
  static async register(credentials) {
    if (
      credentials.first_name !== '' &&
      credentials.last_name !== '' &&
      credentials.email !== '' &&
      credentials.phone !== '' &&
      credentials.gender !== '' &&
      credentials.password !== '' &&
      credentials.confrim_password !== ''
    ) {
      try {
        const response = await fetch(Config.REG_URL, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const res = await response.json();
        //console.log(res);
        return res;
      } catch (error) {
        console.error('Login error:', error);
        throw error; // Handle failed login
      }
    } else {
      const errorObject = {
        message: 'Fields empty',
      };
      console.log(errorObject);
      return errorObject; // Handle empty fields
    }
  }

  // FETCH BUSINESS CONFIG
  static async getBusinessConfig(token) {
    try {
      const response = await fetch(Config.BUSINESS_CONFIG_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await response.json();
      //console.log(res);
      return res;
    } catch (error) {
      console.error('GetBusinessConfig error:', error);
      throw error; // Handle failed fetch
    }
  }
}

export default AuthProvider;
