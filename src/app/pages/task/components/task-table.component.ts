import { Component, ChangeDetectionStrategy, input, computed } from "@angular/core";
import { Task } from "src/app/domain/task/models";


@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskTableComponent { 
  tasks = input<Task[]>([]);
  completedTasks = computed(() => `${this.tasks().filter(task => task.completed).length}/${this.tasks().length}`)
}