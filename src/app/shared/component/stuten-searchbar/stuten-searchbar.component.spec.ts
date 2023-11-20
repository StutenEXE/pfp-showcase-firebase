import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StutenSearchbarComponent } from './stuten-searchbar.component';

describe('StutenSearchbarComponent', () => {
  let component: StutenSearchbarComponent;
  let fixture: ComponentFixture<StutenSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StutenSearchbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StutenSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
