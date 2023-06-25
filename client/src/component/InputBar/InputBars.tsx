import { FC, useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setNewTask } from "../../store/TaskSlice/TaskSlice";
import { v4 as uuidv4 } from 'uuid';
import { RootState } from "../../store";

  
const InputBars: FC = () =>{

    // const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    
    const tasks = useSelector((state: RootState)=>state.tasks);
    const dispatch = useDispatch();
    console.log(tasks);
    

    const handleAddTask = () =>{
        if(task.trim()==='') return null;

        const newTask   = {
            id: uuidv4(),
            task,
            description
        }
        dispatch(setNewTask(newTask))
        setTask('')
        setDescription('')
    }

    return(
        <>
            <div className="flex flex-col w-10/12 mx-auto  gap-3">
                <input value={task} 
                    type="text" className="w-11/12 mx-auto py-3 px-5 shadow-2xl rounded-2xl focus:outline-none" 
                    placeholder="Enter Task" 
                    onChange={(e)=>setTask(e.target.value)} 
                    onKeyDown={(e)=>e.key==='Enter'?handleAddTask():null}
                    />
                <div className="w-11/12 mx-auto  flex justify-between">
                    <input value={description} 
                        placeholder="Description (optional)" 
                        type="text" className="w-10/12 py-3 px-5 focus:outline-none shadow-2xl rounded-2xl" 
                        onChange={(e)=>setDescription(e.target.value)} 
                        onKeyDown={(e)=>e.key==='Enter'?handleAddTask():null}
                        />
                    <AddCircleIcon onClick={handleAddTask}  className="hover:scale-105 cursor-pointer add-button "   />
                </div>
            </div>
        </>
    )
}

export default InputBars;