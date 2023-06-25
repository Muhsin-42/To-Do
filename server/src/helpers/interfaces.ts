import {Document} from "mongoose";


export interface ITodo extends Document{
  id: string;
  task: string;
  description: string;
  isDelete: boolean;
}