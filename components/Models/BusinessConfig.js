
class BusinessConfig {
  constructor(response) {
    this.response_code = response.response_code || '';
    this.message = response.message || '';
    this.content = response.content || null;
    this.errors = response.errors || [];
  }

  // Method to create an instance from JSON
  static fromJson(json) {
    return new BusinessConfig({
      response_code: json.response_code,
      message: json.message,
      content: Content.fromJson(json.content),
      errors: json.errors,
    });
  }

  // Example method to check if registration was successful
  isSuccess() {
    return this.response_code === 'default_200';
  }
}

class Content {
  constructor({
    default_location,
    business_name,
    logo,
    favicon,
    country_code,
    business_address,
    business_phone,
    business_email,
    base_url,
    currency_decimal_point,
    currency_code,
    currency_symbol,
    currency_symbol_position,
    about_us,
    privacy_policy,
    terms_and_conditions,
    refund_policy,
    cancellation_policy,
    image_base_url,
    pagination_limit,
    time_format,
    payment_gateways,
    footer_text,
    cookies_text,
    admin_details,
    min_versions,
    app_url_playstore,
    app_url_appstore,
    web_url,
    google_social_login,
    facebook_social_login,
    apple_social_login,
    phone_number_visibility_for_chatting,
    wallet_status,
    add_to_fund_wallet,
    loyalty_point_status,
    referral_earning_status,
    direct_provider_booking,
    bidding_status,
    phone_verification,
    email_verification,
    forget_password_verification_method,
    cash_after_service,
    digital_payment,
    wallet_payment,
    social_media,
    otp_resend_time,
    max_booking_amount,
    min_booking_amount,
    guest_checkout,
    partial_payment,
    booking_additional_charge,
    additional_charge_label_name,
    additional_charge_fee_amount,
    offline_payment,
    partial_payment_combinator,
    provider_self_registration,
    confirm_otp_for_complete_service,
    instant_booking,
    schedule_booking,
    schedule_booking_time_restriction,
    advanced_booking,
    system_language,
  }) {
    this.default_location = default_location;
    this.business_name = business_name;
    this.logo = logo;
    this.favicon = favicon;
    this.country_code = country_code;
    this.business_address = business_address;
    this.business_phone = business_phone;
    this.business_email = business_email;
    this.base_url = base_url;
    this.currency_decimal_point = currency_decimal_point;
    this.currency_code = currency_code;
    this.currency_symbol = currency_symbol;
    this.currency_symbol_position = currency_symbol_position;
    this.about_us = about_us;
    this.privacy_policy = privacy_policy;
    this.terms_and_conditions = terms_and_conditions;
    this.refund_policy = refund_policy;
    this.cancellation_policy = cancellation_policy;
    this.image_base_url = image_base_url;
    this.pagination_limit = pagination_limit;
    this.time_format = time_format;
    this.payment_gateways = payment_gateways.map(PaymentGateway.fromJson);
    this.footer_text = footer_text;
    this.cookies_text = cookies_text;
    this.admin_details = AdminDetails.fromJson(admin_details);
    this.min_versions = min_versions;
    this.app_url_playstore = app_url_playstore;
    this.app_url_appstore = app_url_appstore;
    this.web_url = web_url;
    this.google_social_login = google_social_login;
    this.facebook_social_login = facebook_social_login;
    this.apple_social_login = apple_social_login;
    this.phone_number_visibility_for_chatting = phone_number_visibility_for_chatting;
    this.wallet_status = wallet_status;
    this.add_to_fund_wallet = add_to_fund_wallet;
    this.loyalty_point_status = loyalty_point_status;
    this.referral_earning_status = referral_earning_status;
    this.direct_provider_booking = direct_provider_booking;
    this.bidding_status = bidding_status;
    this.phone_verification = phone_verification;
    this.email_verification = email_verification;
    this.forget_password_verification_method = forget_password_verification_method;
    this.cash_after_service = cash_after_service;
    this.digital_payment = digital_payment;
    this.wallet_payment = wallet_payment;
    this.social_media = social_media.map(SocialMedia.fromJson);
    this.otp_resend_time = otp_resend_time;
    this.max_booking_amount = max_booking_amount;
    this.min_booking_amount = min_booking_amount;
    this.guest_checkout = guest_checkout;
    this.partial_payment = partial_payment;
    this.booking_additional_charge = booking_additional_charge;
    this.additional_charge_label_name = additional_charge_label_name;
    this.additional_charge_fee_amount = additional_charge_fee_amount;
    this.offline_payment = offline_payment;
    this.partial_payment_combinator = partial_payment_combinator;
    this.provider_self_registration = provider_self_registration;
    this.confirm_otp_for_complete_service = confirm_otp_for_complete_service;
    this.instant_booking = instant_booking;
    this.schedule_booking = schedule_booking;
    this.schedule_booking_time_restriction = schedule_booking_time_restriction;
    this.advanced_booking = AdvancedBooking.fromJson(advanced_booking);
    this.system_language = system_language.map(SystemLanguage.fromJson);
  }

  static fromJson(json) {
    return new Content({
      default_location: json.default_location,
      business_name: json.business_name,
      logo: json.logo,
      favicon: json.favicon,
      country_code: json.country_code,
      business_address: json.business_address,
      business_phone: json.business_phone,
      business_email: json.business_email,
      base_url: json.base_url,
      currency_decimal_point: json.currency_decimal_point,
      currency_code: json.currency_code,
      currency_symbol: json.currency_symbol,
      currency_symbol_position: json.currency_symbol_position,
      about_us: json.about_us,
      privacy_policy: json.privacy_policy,
      terms_and_conditions: json.terms_and_conditions,
      refund_policy: json.refund_policy,
      cancellation_policy: json.cancellation_policy,
      image_base_url: json.image_base_url,
      pagination_limit: json.pagination_limit,
      time_format: json.time_format,
      payment_gateways: json.payment_gateways,
      footer_text: json.footer_text,
      cookies_text: json.cookies_text,
      admin_details: json.admin_details,
      min_versions: json.min_versions,
      app_url_playstore: json.app_url_playstore,
      app_url_appstore: json.app_url_appstore,
      web_url: json.web_url,
      google_social_login: json.google_social_login,
      facebook_social_login: json.facebook_social_login,
      apple_social_login: json.apple_social_login,
      phone_number_visibility_for_chatting: json.phone_number_visibility_for_chatting,
      wallet_status: json.wallet_status,
      add_to_fund_wallet: json.add_to_fund_wallet,
      loyalty_point_status: json.loyalty_point_status,
      referral_earning_status: json.referral_earning_status,
      direct_provider_booking: json.direct_provider_booking,
      bidding_status: json.bidding_status,
      phone_verification: json.phone_verification,
      email_verification: json.email_verification,
      forget_password_verification_method: json.forget_password_verification_method,
      cash_after_service: json.cash_after_service,
      digital_payment: json.digital_payment,
      wallet_payment: json.wallet_payment,
      social_media: json.social_media,
      otp_resend_time: json.otp_resend_time,
      max_booking_amount: json.max_booking_amount,
      min_booking_amount: json.min_booking_amount,
      guest_checkout: json.guest_checkout,
      partial_payment: json.partial_payment,
      booking_additional_charge: json.booking_additional_charge,
      additional_charge_label_name: json.additional_charge_label_name,
      additional_charge_fee_amount: json.additional_charge_fee_amount,
      offline_payment: json.offline_payment,
      partial_payment_combinator: json.partial_payment_combinator,
      provider_self_registration: json.provider_self_registration,
      confirm_otp_for_complete_service: json.confirm_otp_for_complete_service,
      instant_booking: json.instant_booking,
      schedule_booking: json.schedule_booking,
      schedule_booking_time_restriction: json.schedule_booking_time_restriction,
      advanced_booking: json.advanced_booking,
      system_language: json.system_language,
    });
  }
}

class PaymentGateway {
  constructor({ gateway, gateway_image, label }) {
    this.gateway = gateway;
    this.gateway_image = gateway_image;
    this.label = label;
  }

  static fromJson(json) {
    return new PaymentGateway({
      gateway: json.gateway,
      gateway_image: json.gateway_image,
      label: json.label,
    });
  }
}

class AdminDetails {
  constructor({ id, first_name, last_name, profile_image }) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.profile_image = profile_image;
  }

  static fromJson(json) {
    return new AdminDetails({
      id: json.id,
      first_name: json.first_name,
      last_name: json.last_name,
      profile_image: json.profile_image,
    });
  }
}

class AdvancedBooking {
  constructor({ advanced_booking_restriction_value, advanced_booking_restriction_type }) {
    this.advanced_booking_restriction_value = advanced_booking_restriction_value;
    this.advanced_booking_restriction_type = advanced_booking_restriction_type;
  }

  static fromJson(json) {
    return new AdvancedBooking({
      advanced_booking_restriction_value: json.advanced_booking_restriction_value,
      advanced_booking_restriction_type: json.advanced_booking_restriction_type,
    });
  }
}
class SystemLanguage {
  constructor({ id, name, direction, code, status, defaul }) {
    this.id = id;
    this.name = name;
    this.direction = direction;
    this.code = code;
    this.status = status;
    this.defaul = defaul;
  }

  static fromJson(json) {
    return new SystemLanguage({
      id: json.id,
      name: json.name,
      direction: json.direction,
      code: json.code,
      status: json.status,
      defaul: json.default,
    });
  }
}

class SocialMedia {
  constructor({ id, media, link }) {
    this.id = id;
    this.media = media;
    this.link = link;
  }

  static fromJson(json) {
    return new SocialMedia({
      id: json.id,
      media: json.media,
      link: json.link,
    });
  }
}
export default BusinessConfig;