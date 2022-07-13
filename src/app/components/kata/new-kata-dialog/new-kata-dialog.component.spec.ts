import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewKataDialogComponent } from './new-kata-dialog.component';

describe('NewKataDialogComponent', () => {
  let component: NewKataDialogComponent;
  let fixture: ComponentFixture<NewKataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewKataDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewKataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
