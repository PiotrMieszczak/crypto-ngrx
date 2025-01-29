import { Component, ChangeDetectionStrategy, OnInit, inject } from "@angular/core";
import { TaskFacade } from "src/app/domain/task/state";
import { ErrorComponent, LoaderComponent } from "src/app/shared/components";
import { TaskTableComponent } from "./components/task-table.component";
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-task-page',
    templateUrl: './task-page.component.html',
    styleUrls: ['./task-page.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [LoaderComponent, ErrorComponent, TaskTableComponent]
  })
  export class TaskPageComponent implements OnInit { 
    private readonly facade = inject(TaskFacade);

    tasks = toSignal(this.facade.tasks$, { initialValue: []});
    loading = toSignal(this.facade.loading$, { initialValue: true });
    error = toSignal(this.facade.error$, { initialValue: '' });

    ngOnInit() {
      this.facade.loadTasks();
    }
  }