import { useDispatch, useSelector } from "react-redux";
import TasksDisplay from "../Components/TasksDisplay";
import { fetchTrashedTasks } from "../Redux/tasks/trashedTasksSlice";
import { useEffect, useState } from "react";

export default ({
  categories, 
  categoryLoading, 
  categoryError,
  filters,
  dateFilter, 
  setFilters, 
  setDateFilter, 
  FilterHandler,
  DateFilterHandler, 
}) => {

  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  const { items: trashedTasks, loading, error } = useSelector((state) => state.trashedTasks);

  useEffect(() => {
    dispatch(fetchTrashedTasks({pageNum,filters}));
  }, [dispatch, filters, pageNum]);
  

    return (
    <>
      <div className="bg-gray-50 min-h-screen py-12 px-55">
      {message && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg transition-all z-50">
          {message}
        </div>
        )}
            <div className="container mx-auto flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Trash</h1>
      </div>
            <TasksDisplay 
               data={trashedTasks} 
               loading={loading} 
               error={error}
               setFilters={setFilters}
               setDateFilters={setDateFilter}
               filters={filters} 
               dateFilter={dateFilter} 
               filterHandler={FilterHandler} 
               dateFilterHandler={DateFilterHandler} 
               categories={categories}
               categoryLoading={categoryLoading}
               categoryError={categoryError}
               setMessage={setMessage}
               trash={true}
             />
    </div>
    </>
    );
  };
