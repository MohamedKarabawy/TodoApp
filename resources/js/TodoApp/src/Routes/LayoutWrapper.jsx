// src/Router/LayoutWrapper.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Layout from './Layout';
import { fetchCategories } from '../Redux/tasks/categoriesSlice';

export default function LayoutWrapper() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch, location]);

  return <Layout />;
}
