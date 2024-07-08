export const selectRefreshToken = (state) =>
  state.authenticationApiToolkit.refreshToken;

export const selectAccessToken = (state) =>
  state.authenticationApiToolkit.accessToken;

export const selectAuthStatus = (state) =>
  state.authenticationApiToolkit.status;

export const selectIsLoggedIn = (state) =>
  state.authenticationApiToolkit.isLoggedIn;
