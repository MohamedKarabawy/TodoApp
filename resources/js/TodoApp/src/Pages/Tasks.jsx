import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../Redux/tasks/taskSlice';
import TaskModal from "../Components/TaskModal";
import TasksDisplay from "../Components/TasksDisplay";
import { createTask } from "../Redux/tasks/taskCreateSlice";

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
  const { items: tasks, loading, error } = useSelector((state) => state.tasks);
  
  const [message, setMessage] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [getError, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    taskId: null,
    category_id: '',
    title: '',
    description: '',
    status: ''
  });

  useEffect(() => {
    dispatch(fetchTasks({pageNum,filters})); 
  }, [dispatch, filters, pageNum])

  const createHandler = () => {
    dispatch(createTask(formData))
    .then((res) => {

        if (res.meta.requestStatus === "fulfilled") 
          {
              dispatch(fetchTasks({pageNum}));
              setIsModalOpen(false);
              setMessage(res.payload.message || "Task created successfully!");
              setTimeout(() => setMessage(null), 5000);
              setError(null);
              setFormData({ taskId: null, category_id: "", title: "", description: "" });
          }
          else if(res.meta.requestStatus === "rejected")
          {
            setIsModalOpen(true);
            setError(res.payload.message);
          }
    })
    .catch((error) => {
        console.error(error);
      });
  };


  return (
    <>
      <div className="bg-gray-50 min-h-screen py-12 px-55">
      {message && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg transition-all z-50">
          {message}
        </div>
        )}

        <div className="container mx-auto flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Tasks</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Create Task
          </button>
        </div>


        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          createTask={createHandler}
          formData={formData}
          setFormData={setFormData}
          actionError={getError}
          isEditing={false}
        />

        <TasksDisplay 
          data={tasks} 
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
        />
      </div>
    </>
  );
};
