// models/RegisterModel.js
class RegisterModel {
  constructor(response) {
    this.response_code = response.response_code || '';
    this.message = response.message || '';
    this.content = response.content || null;
    this.errors = response.errors || [];
  }

  // Method to create an instance from JSON
  static fromJson(json) {
    return new RegisterModel({
      response_code: json.response_code,
      message: json.message,
      content: json.content,
      errors: json.errors,
    });
  }

  // Example method to check if registration was successful
  isSuccess() {
    return this.response_code === 'registration_200';
  }
}

export default RegisterModel;
