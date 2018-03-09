import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteDetailsComponent } from './favorite-details.component';

describe('FavoriteDetailsComponent', () => {
  let component: FavoriteDetailsComponent;
  let fixture: ComponentFixture<FavoriteDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
