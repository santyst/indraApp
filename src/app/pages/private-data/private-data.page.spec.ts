import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrivateDataPage } from './private-data.page';

describe('PrivateDataPage', () => {
  let component: PrivateDataPage;
  let fixture: ComponentFixture<PrivateDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrivateDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
