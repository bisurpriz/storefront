export enum AuthErrorMessages {
  REFRESH_TOKEN_REQUIRED = "Yenileme anahtarı gereklidir",
  INVALID_REFRESH_TOKEN = "Geçersiz yenileme anahtarı",
  EMAIL_AND_PASSWORD_REQUIRED = "Email ve şifre gereklidir",
  USER_ALREADY_EXIST = "Kullanıcı zaten mevcut",
  EMAIL_OR_PASSWORD_WRONG = "Email veya şifrenizi yanlış girdiniz",
}

export enum CookieTokens {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
  USER_ID = "user_id",
  LOCATION_ID = "location_id",
}
