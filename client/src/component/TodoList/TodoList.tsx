import { IconButton } from "@mui/material";
import { FC, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ITodo  } from "../../utils/interfaces";
import {  deleteTodo, setTodos } from "../../store/TodoSlice/TodoSlice";
import { useDispatch } from "react-redux";
import { todoUrl } from "../../utils/constants";
import axios from '../../utils/axios'

const TodoList: FC = () =>{
    const todos = useSelector((state: RootState)=>state.todos)
    const dispatch = useDispatch();

    const handleDelete = async(id: string) =>{
        try {
            await axios.delete(todoUrl+`/${id}`)
            dispatch(deleteTodo(id))
        } catch (error) {
            
        }
    }

    const getAllTodos = async () =>{
        try {
            const res = await axios.get(todoUrl);
            dispatch(setTodos(res.data))
        } catch (error) {
        }
    }

    useEffect(()=>{
        getAllTodos();
    },[]);

    return (
        <>
            <div className="custom-scrollbar  h-screen overflow-y-scroll  overflow-x-hidden scroll-m-0 scroll-p-0 scroll">
                    {
                        todos && todos?.map((task: ITodo)=>{
                            return (
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
                            )
                        })
                    }
            </div>
        </>
    )
}

export default TodoList;