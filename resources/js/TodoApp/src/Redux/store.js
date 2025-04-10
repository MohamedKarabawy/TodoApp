import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './tasks/taskSlice';
import authReducer from './authSlice';
import categoriesReducer from './tasks/categoriesSlice';
import trashedTasksReducer from './tasks/trashedTasksSlice';
import taskSoftDeleteReducer from './tasks/taskSoftDeleteSlice';
import taskCreateReducer from './tasks/taskCreateSlice';
import taskUpdateReducer from './tasks/taskUpdateSlice';
import userCreateReducer from './user/userCreateSlice';
import userUpdateReducer from './user/userUpdateSlice';

const store = configureStore({
  reducer: {
    createTask: taskCreateReducer,
    updateTask: taskUpdateReducer,
    tasks: taskReducer,
    auth: authReducer,
    categories: categoriesReducer,
    trashedTasks: trashedTasksReducer,
    softDeleteTask: taskSoftDeleteReducer,
    userCreate: userCreateReducer, 
    userUpdate: userUpdateReducer,
  },
});

export default store;
