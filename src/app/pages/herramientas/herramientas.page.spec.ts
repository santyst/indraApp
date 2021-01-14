import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HerramientasPage } from './herramientas.page';

describe('HerramientasPage', () => {
  let component: HerramientasPage;
  let fixture: ComponentFixture<HerramientasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HerramientasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HerramientasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
