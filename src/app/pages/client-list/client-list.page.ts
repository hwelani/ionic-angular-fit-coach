import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.page.html',
  styleUrls: ['./client-list.page.scss']
})
export class ClientListPage implements OnInit {
  public clientList: {};
  constructor(public clientService: ClientService) {}

  ngOnInit() {
    this.clientService
      .clientListShow()
      .valueChanges()
      .subscribe(client => {
        this.clientList = client;
      });
  }
}
