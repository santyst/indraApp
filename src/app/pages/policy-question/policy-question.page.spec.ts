import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PolicyQuestionPage } from './policy-question.page';

describe('PolicyQuestionPage', () => {
  let component: PolicyQuestionPage;
  let fixture: ComponentFixture<PolicyQuestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyQuestionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PolicyQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
