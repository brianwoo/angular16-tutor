import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterDemoSecondComponent } from './router-demo-second.component';

describe('RouterDemoSecondComponent', () => {
  let component: RouterDemoSecondComponent;
  let fixture: ComponentFixture<RouterDemoSecondComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RouterDemoSecondComponent]
    });
    fixture = TestBed.createComponent(RouterDemoSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
