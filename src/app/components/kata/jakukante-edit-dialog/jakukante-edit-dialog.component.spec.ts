import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JakukanteEditDialogComponent } from './jakukante-edit-dialog.component';

describe('JakukanteEditDialogComponent', () => {
  let component: JakukanteEditDialogComponent;
  let fixture: ComponentFixture<JakukanteEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JakukanteEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JakukanteEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
