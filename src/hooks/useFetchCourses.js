import { useEffect, useState } from 'react';
import { getCourses } from '../services/courseService';

export const useFetchCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses().then(setCourses);
  }, []);

  return courses;
};
