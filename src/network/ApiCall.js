import axios from 'axios';

const axiosInstance = axios.create();

const ApiCall = async (
  method = 'post',
  url = '',
  data = null,
  headers = null,
) => {
  const config = {
    method,
    url,
    headers,
    data,
  };

  try {
    const response = await axiosInstance(config);
    return {
      statusCode: response.status,
      data: response.data,
    };
  } catch (error) {
    if (error.response) {
      return {
        statusCode: error?.response?.status,
        data: error?.response?.data,
      };
    }
    return {
      statusCode: 400,
    };
  }
};

export default ApiCall;
