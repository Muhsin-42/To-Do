import { IconButton } from "@mui/material";
import { FC } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Task } from "../../utils/interfaces";
import { deleteTask } from "../../store/TaskSlice/TaskSlice";
import { useDispatch } from "react-redux";

const TodoList: FC = () =>{
    const tasks = useSelector((state: RootState)=>state.tasks)
    const dispatch = useDispatch();

    const handleDelete = (id: string) =>{
        dispatch(deleteTask(id))
    }

    return (
        <>
            <div className="custom-scrollbar  h-screen overflow-y-scroll  overflow-x-hidden scroll-m-0 scroll-p-0 scroll">
                    {
                        tasks && tasks?.map((task: Task)=>{
                            return (
                                <>
                                <div key={task.id} className="todo flex justify-between text-white bg-purple-400 shadow-2xl rounded-3xl px-8 py-2 w-9/12 m-auto my-2 cursor-pointer">
                                    <div className="left flex flex-col">
                                        <span className="font-extrabold text-xl">{task?.task}</span>
                                        <span>{task?.description}</span>
                                    </div>
                                    <div className="right">
                                        <IconButton aria-label="delete">
                                            <DeleteIcon onClick={()=>handleDelete(task.id)} className="text-white" />
                                        </IconButton>
                                    </div>
                                </div>
                                </>
                            )
                        })
                    }
            </div>
        </>
    )
}

export default TodoList;