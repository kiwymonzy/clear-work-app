//SERVER
//php artisan serve --host=192.168.10.54 --port=8000

//URL
//http://127.0.0.1:8000
//http://192.168.10.54:8000
//https://demandium-admin.6amtech.com

//pk.eyJ1Ijoia2l3eW1vbnp5IiwiYSI6ImNrdWI4bTMzejA2d3UydG82OG4zYnd5M3QifQ.DEl1OIhC2kpC8cl0-ZqooQ

class Config {
  static APP_NAME = 'CLEAR WORK';
  static BASE_URL = 'https://demandium-admin.6amtech.com';

  static LOGIN_URL = `${Config.BASE_URL}/api/v1/customer/auth/login`;
  static REG_URL = `${Config.BASE_URL}/api/v1/customer/auth/registration`;
  static BUSINESS_CONFIG_URL = `${Config.BASE_URL}/api/v1/customer/config`;
  static LOGOUT_URL = `${Config.BASE_URL}/api/v1/customer/auth/logout`;
  static BOOKINGLIST_URL = `${Config.BASE_URL}/api/v1/customer/booking`;
  static BOOKINGDETAILS_URL = `${Config.BASE_URL}/api/v1/customer/booking`;
  static TRACKBOOKING_URL = `${Config.BASE_URL}/api/v1/customer/booking/track`;
  static ADDRESS_URL = `${Config.BASE_URL}/api/v1/customer/address`;
  static ZONE_URL = `${Config.BASE_URL}/api/v1/customer/config/get-zone-id`;
  static CUSTOMERINFO_URL = `${Config.BASE_URL}/api/v1/customer/info`;
  static PROVIDERLIST_URL = `${Config.BASE_URL}/api/v1/customer/provider/list`;
  static BANNER_URL = `${Config.BASE_URL}/api/v1/customer/banner`;
  static CATEGORY_URL = `${Config.BASE_URL}/api/v1/customer/category`;
  static SERVICES_URL = `${Config.BASE_URL}/api/v1/customer/service`;
    static SERVICES_TRENDING_URL = `${Config.BASE_URL}/api/v1/customer/service/trending`;
}

export default Config;
