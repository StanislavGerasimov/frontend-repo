import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementDialogComponent } from './advertisement-dialog.component';

describe('AdvertisementDialogComponent', () => {
  let component: AdvertisementDialogComponent;
  let fixture: ComponentFixture<AdvertisementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvertisementDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertisementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
