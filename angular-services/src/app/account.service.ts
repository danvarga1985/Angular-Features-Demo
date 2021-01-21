import {LoggingService} from './logging.service';
import {EventEmitter, Injectable} from '@angular/core';

/*
    Lets Angular know that we expect to use the service at the root-level (module.ts OR app-component ??????)
    Because module.ts/app-component ???? is the parent of all other components, they all inherit the same instance of AccountService.
    Except if they overwrite it with another instance.
  */
@Injectable({providedIn: 'root'})
export class AccountService {

  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  statusUpdated = new EventEmitter<string>();

  constructor(private loggingService: LoggingService) {
  }

  // Adds a new Account to the 'account' list
  addAccount(name: string, status: string) {
    this.accounts.push({name: name, status: status});
    this.loggingService.logStatusChange(status);
  }

  updateStatus(number: number, status: string) {
    this.accounts[number].status = status;
    this.loggingService.logStatusChange(status);
  }
}
