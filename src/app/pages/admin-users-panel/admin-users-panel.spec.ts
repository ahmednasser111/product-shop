import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersPanel } from './admin-users-panel';

describe('AdminUsersPanel', () => {
  let component: AdminUsersPanel;
  let fixture: ComponentFixture<AdminUsersPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUsersPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUsersPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
