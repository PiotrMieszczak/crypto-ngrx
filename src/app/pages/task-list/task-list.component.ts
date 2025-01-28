import { Component, ChangeDetectionStrategy, OnInit, inject } from "@angular/core";
import { TaskFacade } from "src/app/+state/task";


@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class TaskListComponent implements OnInit { 
    private readonly facade = inject(TaskFacade);

    tasks$ = this.facade.tasks$;
    loading$ = this.facade.loading$;


    ngOnInit() {
      this.facade.loadTasks();
    }
  }