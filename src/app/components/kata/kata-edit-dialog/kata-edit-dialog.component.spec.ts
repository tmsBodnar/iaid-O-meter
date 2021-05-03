import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KataEditDialogComponent } from './kata-edit-dialog.component';

describe('KataEditDialogComponent', () => {
  let component: KataEditDialogComponent;
  let fixture: ComponentFixture<KataEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KataEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KataEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
