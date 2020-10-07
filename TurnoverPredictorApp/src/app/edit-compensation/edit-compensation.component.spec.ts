import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompensationComponent } from './edit-compensation.component';

describe('EditCompensationComponent', () => {
  let component: EditCompensationComponent;
  let fixture: ComponentFixture<EditCompensationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCompensationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompensationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
