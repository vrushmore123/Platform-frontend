import axios from 'axios';

const API_URL = 'http://localhost:5000/api/courses';

export const getCourses = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};
