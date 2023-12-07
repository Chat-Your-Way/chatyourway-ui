// export const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const BASE_URL = 'http://chat.eu-central-1.elasticbeanstalk.com';
export const Referer = document.referrer;
export const ajwt = JSON.parse(localStorage.getItem('accessToken'));
export const rjwt = JSON.parse(localStorage.getItem('refreshToken'));
