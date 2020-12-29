import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TratamientoDatosPage } from './tratamiento-datos.page';

describe('TratamientoDatosPage', () => {
  let component: TratamientoDatosPage;
  let fixture: ComponentFixture<TratamientoDatosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TratamientoDatosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TratamientoDatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
