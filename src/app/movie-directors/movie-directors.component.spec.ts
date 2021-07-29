import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDirectorsComponent } from './movie-directors.component';

describe('MovieDirectorsComponent', () => {
  let component: MovieDirectorsComponent;
  let fixture: ComponentFixture<MovieDirectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDirectorsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDirectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
