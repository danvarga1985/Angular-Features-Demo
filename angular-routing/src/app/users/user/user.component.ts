import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: { id: number, name: string };

  // ActivatedRoute object will provide access to the id passed in the URL -> Selected User
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = {
      // Bind parameters from the ActivatedRoute to properties of the 'user'
      // TODO: ??????? 'id' 'name'
      'id': this.route.snapshot.params['id'],
      'name': this.route.snapshot.params['name']
    };

    /*
     At component-initialization set to follow changes in the parameters of the ActivatedRoute (set in app-module).
     Whenever the component subscribed to is destroyed, the subscription will be cleared by Angular - otherwise OnDestroy lifecycle-hook
     would be needed. (Subscription initialized as a class variable - OnDestroy would call the '.unsubscribe' function.)
    */
    this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    );
  }

}
