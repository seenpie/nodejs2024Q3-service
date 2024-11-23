type AccessToken = string;
type RefreshToken = string;

export interface IToken {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
}
