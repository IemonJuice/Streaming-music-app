import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedMusicComponent } from './uploaded-music.component';

describe('UploadedMusicComponent', () => {
  let component: UploadedMusicComponent;
  let fixture: ComponentFixture<UploadedMusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadedMusicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadedMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
