import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  public isAdmin = false;
  public weightTrackForm: FormGroup;
  public weightHistory: Observable<any>;
  constructor(
    public router: Router,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public clientService: ClientService
  ) {
    this.weightTrackForm = formBuilder.group({ weight: [Validators.required] });
  }

  ngOnInit() {
    this.authService.isAdmin().then(adminStatus => {
      this.isAdmin = adminStatus;
    });

    this.weightHistory = this.clientService
      .clientWeightHistory()
      .valueChanges();
  }

  weightTrack(weightTrackForm: FormGroup): void {
    this.clientService.clientTrackWeight(weightTrackForm.value.weight);
    this.weightTrackForm.reset();
  }
}
