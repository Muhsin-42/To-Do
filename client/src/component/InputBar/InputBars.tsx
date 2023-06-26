import { FC } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch } from "react-redux";
import { setNewTodo } from "../../store/TodoSlice/TodoSlice";
import { v4 as uuidv4 } from 'uuid';
import axios from '../../utils/axios';
import { todoUrl } from "../../utils/constants";
import { useFormik } from "formik";
import * as Yup from "yup"; 
import { IconButton } from "@mui/material";
import { IInputValues } from "../../utils/interfaces";

const validationSchema = Yup.object({
    task: Yup.string().trim().required("Task is required").min(3, "Task should be at least 3 characters"),
});

const initialValues = {
    task: "",
    description: "",
}

const InputBars: FC = () =>{

    const dispatch = useDispatch();


    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
          handleAddTask(values);
        },
    });
      

      const handleAddTask = async (values: IInputValues) => {
        if (!formik.isValid) return; 
      
        const newTodo = {
          id: uuidv4(),
          task: values.task,
          description: values.description,
        };
      
        try {
            await axios.post(todoUrl, newTodo);
            dispatch(setNewTodo(newTodo));
            formik.resetForm(); // Reset form values
        } catch (error) {
        }
      };
      

    return(
        <>
            <form onSubmit={formik.handleSubmit} className="flex flex-col w-10/12 mx-auto  gap-3">
            <input
                value={formik.values.task}
                type="text" id="task"
                className={`w-11/12 mx-auto py-3 px-5 shadow-2xl rounded-2xl 
                            ${formik.errors.task?'focus:outline outline-red-500 outline-2':'focus:outline-none'}`}
                placeholder="Enter Task"
                onChange={formik.handleChange}
                // onKeyDown={(e) => e.key === "Enter" ? formik.handleSubmit() : null}
                />
                {formik.errors.task && <div className="text-white w-11/12 mx-auto">{formik.errors.task}</div>}

                <div className="w-11/12 mx-auto  flex justify-between">
                    <input  id="description" value={formik.values.description}
                        placeholder="Description (optional)" 
                        type="text" className="w-10/12 py-3 px-5 focus:outline-none shadow-2xl rounded-2xl" 
                        onChange={formik.handleChange}
                        // onKeyDown={(e) => e.key === "Enter" ? formik.handleSubmit() : null}
                        />
                        <IconButton aria-label="add" onClick={()=>formik.handleSubmit()}>
                            <AddCircleIcon   className="hover:scale-105 cursor-pointer add-button "   />
                        </IconButton>
                </div>
                </form>
        </>
    )
}

export default InputBars;