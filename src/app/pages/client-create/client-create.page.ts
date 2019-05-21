import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.page.html',
  styleUrls: ['./client-create.page.scss']
})
export class ClientCreatePage implements OnInit {
  public clientCreateForm: FormGroup;
  constructor(
    public router: Router,
    public clientService: ClientService,
    public formBuilder: FormBuilder
  ) {
    this.clientCreateForm = formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      startingWeight: ['', Validators.required]
    });
  }

  ngOnInit() {}

  clientCreate(clientCreateForm): void {
    if (!clientCreateForm.valid) {
      console.log(clientCreateForm.value);
    } else {
      this.clientService
        .clientCreate(
          clientCreateForm.value.name,
          clientCreateForm.value.email,
          clientCreateForm.value.startingWeight
        )
        .then(
          () => {
            this.router.navigateByUrl('/home');
          },
          error => {
            console.error(error);
          }
        );
    }
  }
}
