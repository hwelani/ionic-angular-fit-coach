import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.page.html',
  styleUrls: ['./client-detail.page.scss']
})
export class ClientDetailPage implements OnInit {
  public client: Observable<any>;
  public clientWeightTrack: Observable<any>;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public clientService: ClientService
  ) {}

  ngOnInit() {
    this.client = this.clientService
      .clientDetailShow(this.route.snapshot.paramMap.get('id'))
      .valueChanges();
    this.clientWeightTrack = this.clientService
      .clientWeightHistoryCoach(this.route.snapshot.paramMap.get('id'))
      .valueChanges();
  }
}
