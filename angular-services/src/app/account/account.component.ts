import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoggingService} from '../logging.service';
import {AccountService} from '../account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService]
})
export class AccountComponent  {
  // Receives the data from the app-component.html
  @Input() account: { name: string, status: string };
  @Input() id: number;

  constructor(private loggingService: LoggingService, private accountService: AccountService) {
  }

  onSetTo(status: string) {
    // Using the injected service
    this.accountService.updateStatus(this.id, status);
    // Emits the click-event in the AccountService to which the New-Account component is subscribed to
    this.accountService.statusUpdated.emit(status);
  }
}
