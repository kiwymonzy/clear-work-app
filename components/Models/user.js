
class User {
  constructor(
    id,
    firstName,
    lastName,
    email,
    phone,
    identificationNumber,
    identificationType,
    identificationImage,
    dateOfBirth,
    gender,
    profileImage,
    fcmToken,
    isPhoneVerified,
    isEmailVerified,
    phoneVerifiedAt,
    emailVerifiedAt,
    isActive,
    userType,
    rememberToken,
    deletedAt,
    createdAt,
    updatedAt,
    walletBalance,
    loyaltyPoint,
    refCode,
    referredBy,
    loginHitCount,
    isTempBlocked,
    tempBlockTime,
    currentLanguageKey,
    bookingsCount
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.identificationNumber = identificationNumber;
    this.identificationType = identificationType;
    this.identificationImage = identificationImage;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.profileImage = profileImage;
    this.fcmToken = fcmToken;
    this.isPhoneVerified = isPhoneVerified;
    this.isEmailVerified = isEmailVerified;
    this.phoneVerifiedAt = phoneVerifiedAt;
    this.emailVerifiedAt = emailVerifiedAt;
    this.isActive = isActive;
    this.userType = userType;
    this.rememberToken = rememberToken;
    this.deletedAt = deletedAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.walletBalance = walletBalance;
    this.loyaltyPoint = loyaltyPoint;
    this.refCode = refCode;
    this.referredBy = referredBy;
    this.loginHitCount = loginHitCount;
    this.isTempBlocked = isTempBlocked;
    this.tempBlockTime = tempBlockTime;
    this.currentLanguageKey = currentLanguageKey;
    this.bookingsCount = bookingsCount;
  }

  static fromJson(json) {
    const content = json.content;
    return new User(
      content.id,
      content.first_name,
      content.last_name,
      content.email,
      content.phone,
      content.identification_number,
      content.identification_type,
      content.identification_image,
      content.date_of_birth,
      content.gender,
      content.profile_image,
      content.fcm_token,
      content.is_phone_verified,
      content.is_email_verified,
      content.phone_verified_at,
      content.email_verified_at,
      content.is_active,
      content.user_type,
      content.remember_token,
      content.deleted_at,
      content.created_at,
      content.updated_at,
      content.wallet_balance,
      content.loyalty_point,
      content.ref_code,
      content.referred_by,
      content.login_hit_count,
      content.is_temp_blocked,
      content.temp_block_time,
      content.current_language_key,
      content.bookings_count
    );
  }
}

export default User;
