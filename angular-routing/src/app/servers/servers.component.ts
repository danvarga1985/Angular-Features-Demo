import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService,
              private router: Router,
              // ActivatedRoute injects the current route/path
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload(): void {
/*
     The navigate command doesn't know about the route/path the component is on, therefore 'servers' & '/servers' are the same if
     ActivatedRoute is not injected.
*/
    this.router.navigate(['/servers'], {relativeTo: this.route});
  }

}
