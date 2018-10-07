import cookies from 'js-cookie';
const AUTH_COOKIE_NAME = 'FB_TOKEN';

export function isAuthCookiePresent() {
  return cookies.get(AUTH_COOKIE_NAME) && cookies.get(AUTH_COOKIE_NAME) !== null;
}

export function saveAuthCookie(cookieValue) {
  cookies.set(AUTH_COOKIE_NAME, cookieValue);
}

export function removeAuthCookie() {
  cookies.remove(AUTH_COOKIE_NAME);
}

export function getAuthCookie() {
  return cookies.get(AUTH_COOKIE_NAME);
}

export function getAuthTokenKey() {
  return AUTH_COOKIE_NAME;
}