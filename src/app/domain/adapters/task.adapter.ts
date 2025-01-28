import { TaskDTO } from "../dto";
import { Task } from "../models";

export function createTask(taskDTO: TaskDTO): Task {
    return {
        ...taskDTO
    }
}