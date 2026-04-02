import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListItemsComponent } from './user-list-items.component';

describe('UserListItemsComponent', () => {
  let component: UserListItemsComponent;
  let fixture: ComponentFixture<UserListItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserListItemsComponent]
    });
    fixture = TestBed.createComponent(UserListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
