import { Schema, Document, Model, model } from 'mongoose';
import { ITodo } from '../helpers/interfaces';
import Joi from 'joi'

const TodoSchema: Schema<ITodo> = new Schema<ITodo>(
  {
    id: {
      type: String,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


export const validate = (data: any): Joi.ValidationResult => {
    const schema = Joi.object({
      id: Joi.string().required().label('id'),
      task: Joi.string().trim().required().min(3).label('task'),
      description: Joi.string().label('description')
    });
    return schema.validate(data);
};

const TodoModel: Model<ITodo> = model<ITodo>('todos', TodoSchema);

export default TodoModel;