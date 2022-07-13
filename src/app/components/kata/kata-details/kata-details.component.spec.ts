import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KataDetailsComponent } from './kata-details.component';

describe('KataDetailsComponent', () => {
  let component: KataDetailsComponent;
  let fixture: ComponentFixture<KataDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KataDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KataDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
