import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BioseguridadPage } from './bioseguridad.page';

describe('BioseguridadPage', () => {
  let component: BioseguridadPage;
  let fixture: ComponentFixture<BioseguridadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BioseguridadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BioseguridadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
