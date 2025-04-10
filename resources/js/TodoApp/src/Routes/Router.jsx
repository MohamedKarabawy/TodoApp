import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Tasks from '../Pages/Tasks';
import Trash from '../Pages/Trash';
import Profile from '../Pages/Profile';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import LayoutWrapper from './LayoutWrapper';
import PrivateRoute from './PrivateRoute';

export default function AppRouter() {
    const { categories, categoryLoading, categoryError } = useSelector((state) => state.categories);  

    const [filters, setFilters] = useState({
      sort: '',
      category: '',
      status: '',
      search: '',
      start_date: '',
      end_date: ''
    });
  
    const [dateFilter, setDateFilter] = useState({
      start_date: '',
      end_date: '',
    });

    const FilterHandler = (e) => {
      const { name, value } = e.target;
      setFilters((prev) => ({
        ...prev,
        [name]: value
      }));
    };
  
    const DateFilterHandler = (e) => {
      const { name, value } = e.target;
      setDateFilter((prev) => {
        const updatedDateFilter = {
          ...prev,
          [name]: value
        };
    
        if (updatedDateFilter.start_date && updatedDateFilter.end_date) 
        {
          setFilters((prevFilters) => ({
            ...prevFilters,
            start_date: updatedDateFilter.start_date,
            end_date: updatedDateFilter.end_date
          }));
        }
    
        return updatedDateFilter;
      });
    };

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute element={<LayoutWrapper />} />}
>
              <Route path="/tasks" 
                element={
                <Tasks 
                filters={filters} 
                dateFilter={dateFilter} 
                setFilters={setFilters} 
                setDateFilter={setDateFilter} 
                FilterHandler={FilterHandler} 
                DateFilterHandler={DateFilterHandler}
                categories={categories}
                categoryLoading={categoryLoading}
                categoryError={categoryError}
              />} 
              />
              <Route path="/trash" 
              element={
              <Trash 
                filters={filters} 
                dateFilter={dateFilter} 
                setFilters={setFilters} 
                setDateFilter={setDateFilter} 
                FilterHandler={FilterHandler} 
                DateFilterHandler={DateFilterHandler}
                categories={categories}
                categoryLoading={categoryLoading}
                categoryError={categoryError}
              />} 
              />
              <Route path="/profile" element={<Profile />} />
          </Route>
      </Routes>
    </Router>
  );
}