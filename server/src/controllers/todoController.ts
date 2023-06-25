import { Request, Response } from 'express';
import  TodoModel,{validate} from '../models/TodoModel';
import { ITodo } from '../helpers/interfaces';



const todoController = {
    addTodo:  async (req: Request, res: Response) => {
        try {
          const { id, task, description } = req.body;

          const { error } = validate(req.body);
          if (error)
            return res.status(400).send({ message: error.details[0].message });

          const newTodo: ITodo = new TodoModel({
            id, task, description
          });
      
          const savedTodo = await newTodo.save();      
          res.status(201).json(savedTodo);
        } catch (error) {
          res.status(500).json({ error: 'Failed to create quiz' });
        }
      },
    getTodos : async(req: Request,res: Response)=>{
        try {
            const todos = await TodoModel.find({isDelete:false});
            res.status(200).json(todos);
        } catch (error) {
            res.status(500).json({msg:'Internal server error'});
        }
    }
};

export = todoController;