import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfpDetailsComponent } from './pfp-details.component';

describe('PfpDetailsComponent', () => {
  let component: PfpDetailsComponent;
  let fixture: ComponentFixture<PfpDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PfpDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PfpDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
