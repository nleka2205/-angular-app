import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.scss']
})
export class AddcontactComponent implements OnInit {

  constructor(
    private dialog: DialogRef
  ) { }

  contactForm = new FormGroup({
    contactName: new FormControl('', Validators.required),
    contactNumber: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
  }

  get name(){
    return this.contactForm.get('contactName');
  }
  get number(){
    console.log(this.contactForm.get('contactNumber'));
    return this.contactForm.get('contactNumber');
  }

  submit() {   
    if((this.contactForm.valid)){
      const fullname = this.contactForm.get('contactName')?.value;
      const phonenumber = this.contactForm.get('contactNumber')?.value;
      if (!phonenumber || !fullname) return;
      this.dialog.close({ contactName: fullname, contactNumber: phonenumber });
    }
  }

}
