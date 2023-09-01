import { Component } from '@angular/core';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-1';
  constructor() {
    
    ReactiveFormConfig.set({
      "validationMessage": {
         "required": "This field is required.",
         
    }
    });
  }

}
