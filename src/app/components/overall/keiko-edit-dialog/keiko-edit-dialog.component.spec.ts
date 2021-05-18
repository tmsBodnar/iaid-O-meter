import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeikoEditDialogComponent } from './keiko-edit-dialog.component';

describe('KeikoEditDialogComponent', () => {
  let component: KeikoEditDialogComponent;
  let fixture: ComponentFixture<KeikoEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeikoEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeikoEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
