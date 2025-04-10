import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";

export default ({ isOpen, onClose, createTask, updateTask, formData, setFormData, error, isEditing = false }) => {
    const { categories } = useSelector((state) => state.categories);  

    if (!isOpen) return null;

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if(isEditing)
        {
            updateTask();
        }
        else
        {
           createTask();
        }
    };    

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
                <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Task' : 'Create Task'}</h2>

                {error && (
                    <div className="mb-4 text-red-600 font-medium">
                        {error}
                    </div>
                    )}

                <form onSubmit={submitHandler} className="space-y-4">
                    <div className="relative">
                        <label className="block mb-1 font-medium">Category</label>
                        <select
                            name="category_id"
                            defaultValue={isEditing ? formData?.category_id : ''}
                            onChange={changeHandler}
                            className="w-full border border-gray-300 rounded-md px-3 py-3 pr-8 appearance-none"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories?.length > 0 && categories?.map((category, key) => (
                            <option 
                            key={key} 
                            value={category.id}   
                            >
                                {category.category_name}
                            </option>
                            ))}
                        </select>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-600"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            defaultValue={isEditing ? formData?.title : ''}
                            onChange={changeHandler}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Description</label>
                        <textarea
                            name="description"
                            defaultValue={isEditing ? formData?.description : ''}
                            onChange={changeHandler}
                            className="w-full h-32 resize-none border border-gray-300 rounded-md px-3 py-2"
                            required
                        ></textarea>
                    </div>

                    {isEditing && (<div className="relative">
                        <label className="block mb-1 font-medium">Status</label>
                        <select
                            name="status"
                            defaultValue={isEditing ? formData?.status : ''}
                            onChange={changeHandler}
                            className="w-full border border-gray-300 rounded-md px-3 py-3 pr-8 appearance-none"
                            required
                        >
                            <option value="">Select status</option>
                            <option 
                            value="Pending"
                            >
                                Pending
                            </option>
                            <option 
                            value="In Progress"
                            >
                                In Progress
                                </option>
                            <option 
                            value="Completed"
                            >
                                Completed
                            </option>
                        </select>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-600"
                        />
                    </div>)}


                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                            {isEditing ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
