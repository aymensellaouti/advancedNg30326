import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PereCDComponent } from './pere-cd.component';

describe('PereCDComponent', () => {
  let component: PereCDComponent;
  let fixture: ComponentFixture<PereCDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PereCDComponent]
    });
    fixture = TestBed.createComponent(PereCDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
