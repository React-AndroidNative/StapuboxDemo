import ApiCall from './ApiCall';
import { API_END_POINTS, API_TYPE } from './endpoint';
import { API_TOKEN } from '@env';

export async function sendOtp(
  data,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    const response = await ApiCall(
      API_TYPE.POST,
      API_END_POINTS.SEND_OTP,
      data,
      {
        'X-Api-Token': API_TOKEN,
      },
    );
    if (response?.data?.status == 'success') {
      successCallBack(response?.data);
    } else {
      failureCallBack(response?.data);
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function verifyOtp(
  data,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    const response = await ApiCall(
      API_TYPE.POST,
      API_END_POINTS.VERIFY_OTP(data.mobile, data.otp),
      null,
      {
        'X-Api-Token': API_TOKEN,
      },
    );
    if (response?.data?.status == 'success') {
      successCallBack(response?.data);
    } else {
      failureCallBack(response?.data);
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}

export async function resendOtp(
  data,
  successCallBack,
  failureCallBack,
  errorCallBack,
) {
  try {
    const response = await ApiCall(
      API_TYPE.POST,
      API_END_POINTS.RESEND_OTP(data.mobile),
      null,
      {
        'X-Api-Token': API_TOKEN,
      },
    );
    if (response?.data?.status == 'success') {
      successCallBack(response?.data);
    } else {
      failureCallBack(response?.data);
    }
  } catch (error) {
    console.error(error);
    errorCallBack(error);
  }
}
