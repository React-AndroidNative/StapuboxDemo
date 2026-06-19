import { API_BASE_URL } from '@env';
export const API_END_POINTS = {
  SEND_OTP: `${API_BASE_URL}sendOtp`,
  VERIFY_OTP: (mobile, otp) =>
    `${API_BASE_URL}verifyOtp?mobile=${mobile}&otp=${otp}`,
  RESEND_OTP: mobile => `${API_BASE_URL}resendOtp?mobile=${mobile}`,
};
export const API_TYPE = {
  GET: 'get',
  POST: 'post',
};
