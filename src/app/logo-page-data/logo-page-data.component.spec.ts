import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoPageDataComponent } from './logo-page-data.component';

describe('LogoPageDataComponent', () => {
  let component: LogoPageDataComponent;
  let fixture: ComponentFixture<LogoPageDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoPageDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogoPageDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
