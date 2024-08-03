// models/LoginModel.js
class LoginModel {
  constructor(response) {
    this.response_code = response.response_code || '';
    this.message = response.message || '';
    this.content = response.content || {};
    this.errors = response.errors || [];
  }

  // Method to create an instance from JSON
  static fromJson(json) {
    return new LoginModel({
      response_code: json.response_code,
      message: json.message,
      content: json.content,
      errors: json.errors,
    });
  }

  // Example method to check if login was successful
  isSuccess() {
    return this.response_code === 'auth_login_200';
  }
}

export default LoginModel;
