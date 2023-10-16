const getBaseUrl = () => {
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:5000/';
  }
  return 'someotherlinkindeployment';
};
const baseUrl = getBaseUrl();
export default baseUrl;
