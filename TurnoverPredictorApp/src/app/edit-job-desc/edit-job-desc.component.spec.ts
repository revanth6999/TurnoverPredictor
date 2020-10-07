import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobDescComponent } from './edit-job-desc.component';

describe('EditJobDescComponent', () => {
  let component: EditJobDescComponent;
  let fixture: ComponentFixture<EditJobDescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditJobDescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJobDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
