import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockRowComponent } from './block-row.component';

describe('BlockRowComponent', () => {
  let component: BlockRowComponent;
  let fixture: ComponentFixture<BlockRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
