import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterDemoFirstComponent } from './router-demo-first.component';

describe('RouterDemoFirstComponent', () => {
  let component: RouterDemoFirstComponent;
  let fixture: ComponentFixture<RouterDemoFirstComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RouterDemoFirstComponent]
    });
    fixture = TestBed.createComponent(RouterDemoFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
