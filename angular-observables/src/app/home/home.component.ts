import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObservableSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    // this.firstObservableSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    const customIntervalObservable = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        // Omit data
        observer.next(count);
        if (count === 2) {
          // Stop the observable from omitting
          observer.complete();
        }
        if (count > 3) {
          // Throw an error, and stop omitting
          observer.error(new Error('Count is greater than 3'));
        }
        count++;
      }, 1000);
    });


    this.firstObservableSubscription = customIntervalObservable.pipe(map((data: number) => {
      return 'Round' + (data + 1);
    })).subscribe(count => {
      console.log(count);
    }, /*handle the error*/ error => {
      console.log(error.message);
      alert(error.message);
    }, /*handle completion*/() => {
      console.log('Completed');
    });
  }

  ngOnDestroy(): void {
    this.firstObservableSubscription.unsubscribe();
  }

}
