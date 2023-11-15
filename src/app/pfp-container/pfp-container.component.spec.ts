import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfpContainerComponent } from './pfp-container.component';

describe('PfpContainerComponent', () => {
  let component: PfpContainerComponent;
  let fixture: ComponentFixture<PfpContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PfpContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PfpContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
