export enum AuthErrorMessages {
  REFRESH_TOKEN_REQUIRED = "Yenileme anahtarı gereklidir",
  INVALID_REFRESH_TOKEN = "Geçersiz yenileme anahtarı",
  EMAIL_AND_PASSWORD_REQUIRED = "Email ve şifre gereklidir",
  USER_ALREADY_EXISTS = "Kullanıcı zaten mevcut",
  EMAIL_OR_PASSWORD_WRONG = "Email veya şifrenizi yanlış girdiniz",
  INTERNAL_SERVER_ERROR = "Bir hata oluştu, lütfen daha sonra tekrar deneyiniz",
}

export enum CookieTokens {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
  USER_ID = "user_id",
  LOCATION_ID = "location_id_v1",
  GUEST_ID = "guest_id",
  NEXT_AUTH_SESSION_TOKEN = "next-auth.session-token",
  HAS_SEEN_LOCATION_MODAL = "has_seen_location_modal",
}
