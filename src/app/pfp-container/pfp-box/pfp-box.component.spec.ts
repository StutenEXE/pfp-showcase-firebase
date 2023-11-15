import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfpBoxComponent } from './pfp-box.component';

describe('PfpComponent', () => {
  let component: PfpBoxComponent;
  let fixture: ComponentFixture<PfpBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PfpBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PfpBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
