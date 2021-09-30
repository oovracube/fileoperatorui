import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapitemComponent } from './map-item.component';

describe('MapitemComponent', () => {
  let component: MapitemComponent;
  let fixture: ComponentFixture<MapitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
