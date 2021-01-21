import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        // ['server'] refers to-, and has to match the name of the resolver of the path in the 'app-routing-module'
        this.server = data['server'];
      }
    );
    // Adding '+' "converts" the property to number
    // const id = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.server = this.serversService.getServer(+params['id']);
    //   }
    // );
  }

  onEdit(): void {
    /*
     -Relative path can be used, since the absolute path would be: navigate(['/servers', this.server.id, 'edit'])
     -relativeTo lets Angular know in which route's context will we navigate
     -queryParamsHandling makes sure that on navigate, the query parameters won't get lost - 'merge' would be useful if new params were to
     be added, so that the old params would not get overwritten
    */
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }

}
