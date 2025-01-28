import { TaskDTO } from "../dto";
import { Task } from "../models";

export class TaskAdapter {
    public static createTask(taskDTO: TaskDTO): Task {
        return {
            ...taskDTO
        }
    }
}