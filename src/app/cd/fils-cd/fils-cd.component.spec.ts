import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilsCDComponent } from './fils-cd.component';

describe('FilsCDComponent', () => {
  let component: FilsCDComponent;
  let fixture: ComponentFixture<FilsCDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilsCDComponent]
    });
    fixture = TestBed.createComponent(FilsCDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
