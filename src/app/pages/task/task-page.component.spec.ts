import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskPageComponent } from './task-page.component';
import { initialState, TaskFacade } from 'src/app/domain/task/state';;
import { By } from '@angular/platform-browser';
import { mockTasks } from 'src/app/mocks/task.mock';
import * as TaskActions from 'src/app/domain/task/state/task.actions';
import * as TaskSelectors from 'src/app/domain/task/state/task.selectors';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

describe('TaskPageComponent', () => {
    let component: TaskPageComponent;
    let fixture: ComponentFixture<TaskPageComponent>;
    let store: MockStore;
    let dispatchSpy: jest.SpyInstance;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [TaskPageComponent],
      providers: [TaskFacade, 
        provideMockStore({
            initialState,
            selectors: [
              { selector: TaskSelectors.selectTasks, value: initialState.tasks },
              { selector: TaskSelectors.selectLoading, value: initialState.loading },
              { selector: TaskSelectors.selectError, value: initialState.error },
            ],
          }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;

    dispatchSpy = jest.spyOn(store, 'dispatch'); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call `getTasks` on init', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(TaskActions.getTasks());
  });

  it('should display the loader component', () => {
    store.overrideSelector(TaskSelectors.selectLoading, true);
    store.refreshState();
    fixture.detectChanges();

    const loader = fixture.debugElement.query(By.css('app-loader'));
    expect(loader).toBeTruthy();
  });

  it('should display the error component', () => {
    const errorMessage = 'error';
    store.overrideSelector(TaskSelectors.selectError, errorMessage);
    store.refreshState();
    fixture.detectChanges();

    const errorComponent = fixture.debugElement.query(By.css('app-error'));
    expect(errorComponent).toBeTruthy();
    expect(errorComponent.nativeElement.textContent).toContain(errorMessage);
  });

  it('should display the task table with proper data', () => {
    store.overrideSelector(TaskSelectors.selectTasks, mockTasks);
    store.refreshState();
    fixture.detectChanges();

    const taskTable = fixture.debugElement.query(By.css('app-task-table'));
    expect(taskTable).toBeTruthy();

    const tableRows = taskTable.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(mockTasks.length + 1);
  });

  it('should display completed task counter', () => {
    store.overrideSelector(TaskSelectors.selectTasks, mockTasks);
    store.refreshState();
    fixture.detectChanges();

    const taskTable = fixture.debugElement.query(By.css('app-task-table'));
    expect(taskTable).toBeTruthy();

    const completedText = fixture.debugElement.query(By.css('p'));
    expect(completedText.nativeElement.textContent).toContain('Completed Tasks: 1/2');
  });
});

