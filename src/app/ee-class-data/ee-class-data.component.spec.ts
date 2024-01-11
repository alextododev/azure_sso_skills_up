import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EeClassDataComponent } from './ee-class-data.component';

describe('EeClassDataComponent', () => {
  let component: EeClassDataComponent;
  let fixture: ComponentFixture<EeClassDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EeClassDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EeClassDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
