interface Task {
    id: string;
    task: string;
    description: string
}
interface TasksState {
    [x: string]: any;
    tasks: Task[];
}

export type { Task, TasksState };