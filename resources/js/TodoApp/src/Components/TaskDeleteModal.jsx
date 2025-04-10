import { useDispatch } from "react-redux";
import { softDeleteTask } from "../Redux/tasks/taskSoftDeleteSlice";
import { fetchTasks } from "../Redux/tasks/taskSlice";

export default ({ isOpen, onClose, onDelete, taskId }) => 
{
    const dispatch = useDispatch()

    const softDeleteHandler = () => 
    {
        dispatch(softDeleteTask(taskId))
        .then(() => {
            dispatch(fetchTasks({pageNum: 1}));
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (!isOpen) return null; 
  
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Are you sure you want to delete this task?</h3>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="cursor-pointer px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={() => { softDeleteHandler(); onDelete(); onClose(); }}
              className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };