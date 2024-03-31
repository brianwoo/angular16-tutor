import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

// when error ValidationErrors is returned, or null if valid
function invalidEmailDomain(control: AbstractControl): ValidationErrors | null {
  const value = control.value?.toLowerCase();
  const hosts = ['gmail.com', 'yahoo.com'];

  if (!value) {
    return null;
  }

  const matches = hosts.some(host => value.indexOf(`@${host}`) > -1);

  // note: invalidDomain is the key to check in hasError()
  return matches ? { invalidDomain: true } : null;
}


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  contactForm = new FormGroup({
    senderName: new FormControl('', Validators.required),
    senderEmail: new FormControl('', [Validators.required, Validators.email, invalidEmailDomain]),
    senderMessage: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });





  submitForm() {
    // if (this.senderEmailControl.dirty) {
    //   alert('you changed email');
    // }
    console.log(this.contactForm.valid);
    console.log(this.contactForm.value);
  }

}
