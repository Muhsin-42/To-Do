interface ITodo {
    id: string;
    task: string;
    description: string;
  }
  
interface ITodoState {
    [x: string]: any;
    todos: ITodo[];
}

interface IInputValues{
    task: string,
    description: string
}

export type { ITodo , ITodoState, IInputValues  };