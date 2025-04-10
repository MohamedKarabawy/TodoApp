import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import TaskModal from './TaskModal';
import TaskDeleteModal from './TaskDeleteModal';
import { restoreTask } from '../Redux/tasks/taskRestoreSlice';
import { useDispatch } from 'react-redux';
import { fetchTrashedTasks } from '../Redux/tasks/trashedTasksSlice';
import { updateTask } from '../Redux/tasks/taskUpdateSlice';
import { fetchTasks } from '../Redux/tasks/taskSlice';

export default ({
    data,
    createTask,
    categories,
    categoryLoading,
    categoryError,
    loading,
    error,
    setFilters,
    setDateFilters,
    filterHandler,
    dateFilterHandler,
    filters,
    dateFilter,
    setMessage,
    trash = false
}) => {
    const dispatch = useDispatch();
    const [getError, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [taskId, setTaskId] = useState(0);
    const [formData, setFormData] = useState({
        category_id: '',
        title: '',
        description: '',
        status: ''
    });

    const deleteHandler = () => {
        setIsDeleteModalOpen(false);
    };

    const handlePagination = (pageNum) => {
        if (trash) {
            dispatch(fetchTrashedTasks({ pageNum }));
        }
        else {
            dispatch(fetchTasks({ pageNum }));
        }
    };

    const clearFilters = () => {
        setFilters({
            sort: '',
            category: '',
            status: '',
            search: '',
            start_date: '',
            end_date: ''
        });

        setDateFilters({
            start_date: '',
            end_date: ''
        })
    }

    const restoreHandler = async (taskId) => {
        await dispatch(restoreTask(taskId))
            .then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    dispatch(fetchTrashedTasks({pageNum: data.current_page}));
                    setMessage(res.payload.message || "Task Restored successfully!");
                    setError(null);
                    setTimeout(() => setMessage(null), 5000);
                }
                else if (res.meta.requestStatus === "rejected") {
                    setError(res.payload.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const updateHandler = async () => {
        await dispatch(updateTask(formData))
            .then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    dispatch(fetchTasks({pageNum: data.current_page}));
                    setIsModalOpen(false);
                    setMessage(res.payload.message || "Task updated successfully!");
                    setTimeout(() => setMessage(null), 5000);
                    setError(null);
                    setFormData({ taskId: null, category_id: "", title: "", description: "" });
                }
                else if (res.meta.requestStatus === "rejected") {
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
            <div className="flex justify-between mb-6 bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <div className="flex items-center space-x-4">
                    <input type="text" name="search" onChange={filterHandler} value={filters?.search} placeholder="Search tasks..." className="p-3 border border-gray-300 rounded-md cursor-pointer" />
                    <div className="relative">
                        <select name="sort" value={filters?.sort} onChange={filterHandler} className="p-3 border border-gray-300 rounded-md cursor-pointer appearance-none pr-8">
                            <option value="">Select Sorting</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                        <FontAwesomeIcon icon={faAngleDown} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
                    </div>
                    <div className="relative">
                        <select name="category" value={filters?.category} onChange={filterHandler} className="p-3 border border-gray-300 rounded-md cursor-pointer appearance-none pr-8">
                            <option value="">Select Category</option>
                            {categories?.length > 0 && categories?.map((category, key) => (
                                <option key={key} value={category.id}>{category.category_name}</option>
                            ))}
                        </select>
                        <FontAwesomeIcon icon={faAngleDown} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
                    </div>
                    <div className="relative">
                        <select name="status" value={filters?.status} onChange={filterHandler} className="p-3 border border-gray-300 rounded-md cursor-pointer appearance-none pr-8">
                            <option value="">Select Status</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                        </select>
                        <FontAwesomeIcon icon={faAngleDown} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
                    </div>
                    <div className="relative">
                        <input
                            type="date"
                            name="start_date"
                            value={dateFilter?.start_date}
                            onChange={dateFilterHandler}
                            className="block w-full p-3 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Start Date"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="date"
                            name="end_date"
                            value={dateFilter?.end_date}
                            onChange={dateFilterHandler}
                            className="block w-full p-3 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="End Date"
                        />
                    </div>
                    <button onClick={clearFilters} className="cursor-pointer flex justify-center items-center gap-1.5 text-white bg-gray-400 hover:bg-gray-500 border px-4 py-2 rounded">
                        Clear Filters
                    </button>
                </div>
                {!trash && (
                    <Link to="/trash" className="cursor-pointer flex justify-center items-center gap-1.5 text-gray-500 bg-none hover:text-gray-600 border px-4 py-2 rounded-xl">
                        <FontAwesomeIcon icon={faTrash} /> Trash
                    </Link>
                )}
            </div>
            <div className="flex flex-col space-y-6">
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{"error: " + error}</p>
                ) : data?.message ? (
                    <p className="text-center">{data?.message}</p>
                ) : (
                    data?.data?.map((item, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                            <div className="flex justify-between">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h2>
                                <div className="flex gap-4">
                                    {trash ?
                                        <button onClick={() => restoreHandler(item?.id)} className="cursor-pointer text-white bg-blue-700 px-5 rounded-br-xl hover:bg-blue-800">Restore</button>
                                        :
                                        (
                                            <>
                                                <button onClick={() => {
                                                    setIsModalOpen(true); setFormData({
                                                        taskId: item?.id,
                                                        category_id: item?.category_id,
                                                        title: item?.title,
                                                        description: item?.description,
                                                        status: item?.status
                                                    });
                                                }} className="cursor-pointer text-white bg-blue-400 px-5 rounded-bl-xl hover:bg-blue-500">Edit</button>
                                                <button onClick={() => { setIsDeleteModalOpen(true); setTaskId(item?.id); }} className="cursor-pointer text-white bg-red-500 px-5 rounded-br-xl hover:bg-red-600">Delete</button>
                                            </>
                                        )}

                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                            <div className="flex justify-between items-center text-xs text-gray-400">
                                <span>Category: {item.category_name}</span>
                                <span className={`px-5 py-2 text-white rounded-full ${item.status === 'In Progress'
                                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-300'
                                    : item.status === 'Completed'
                                        ? 'bg-gradient-to-r from-green-400 to-green-300'
                                        : 'bg-gradient-to-r from-blue-400 to-blue-300'
                                    }`}
                                >
                                    {item?.status}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-8 flex justify-center">
                <nav className="flex space-x-2">
                    {(() => {
                        const totalPages = data.last_page;
                        const currentPage = data.current_page;
                        const pageLinks = [];

                        if (currentPage > 1) {
                            pageLinks.push({
                                label: 'Previous',
                                pageNum: currentPage - 1,
                                active: false
                            });
                        }

                        for (let i = 1; i <= totalPages; i++) {
                            if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                                pageLinks.push({
                                    label: i.toString(),
                                    pageNum: i,
                                    active: i === currentPage
                                });
                            } else if (i === currentPage - 3 || i === currentPage + 3) {
                                pageLinks.push({
                                    label: '...',
                                    pageNum: null,
                                    active: false
                                });
                            }
                        }

                        if (currentPage < totalPages) {
                            pageLinks.push({
                                label: 'Next',
                                pageNum: currentPage + 1,
                                active: false
                            });
                        }

                        return pageLinks.map((pageLink, index) => (
                            <button
                                key={index}
                                onClick={() => pageLink.pageNum && handlePagination(pageLink.pageNum)}
                                disabled={!pageLink.pageNum}
                                className={`cursor-pointer px-4 py-2 rounded-lg ${pageLink.active ? 'bg-blue-800 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'} ${!pageLink.pageNum ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {pageLink.label}
                            </button>
                        ));
                    })()}
                </nav>
            </div>


            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                updateTask={updateHandler}
                formData={formData}
                setFormData={setFormData}
                error={getError}
                isEditing={true}
            />

            <TaskDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={deleteHandler}
                taskId={taskId}
            />
        </>
    );
};
