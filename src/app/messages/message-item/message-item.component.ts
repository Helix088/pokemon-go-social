import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})
export class MessageItemComponent implements OnInit, OnDestroy {
  @Input() message: Message;
  messageSender: string;
  subscription: Subscription;

  constructor() {}

  ngOnInit() {
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
