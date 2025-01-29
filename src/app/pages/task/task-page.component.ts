import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
} from '@angular/core';
import { TaskFacade } from 'src/app/domain/task/state';
import { ErrorComponent, LoaderComponent } from 'src/app/shared/components';
import { TaskTableComponent } from './components/task-table.component';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoaderComponent, ErrorComponent, TaskTableComponent],
})
export class TaskPageComponent implements OnInit {
  private readonly facade = inject(TaskFacade);

  tasks = this.facade.tasks;
  loading = this.facade.loading;
  error = this.facade.error;

  ngOnInit() {
    this.facade.getTasks();
  }
}
