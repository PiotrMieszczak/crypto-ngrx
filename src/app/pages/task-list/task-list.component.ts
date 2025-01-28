import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class TaskListComponent { 

  }