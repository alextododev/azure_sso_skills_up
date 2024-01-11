import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoTitleComponent } from './reco-title.component';

describe('RecoTitleComponent', () => {
  let component: RecoTitleComponent;
  let fixture: ComponentFixture<RecoTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecoTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecoTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
