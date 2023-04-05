import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message.model';
// import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService implements OnInit {
  messages: Message[] = [];
  messageListChangedEvent = new Subject<Message[]>();
  messageChangeEvent = new EventEmitter<Message[]>();
  maxMessageId: number;

  constructor(private http: HttpClient) {
    // this.messages = MOCKMESSAGES;
    // this.maxMessageId = this.getMaxId();
  }

  ngOnInit() {}

  getMessages() {
    // return this.messages.slice();
    this.http.get<{message: string; messages: Message[]}>('http://localhost:3000/messages').subscribe(
      (messages) => {
        this.messages = messages.messages;
        this.maxMessageId = this.getMaxId();
        this.messageListChangedEvent.next(this.messages.slice());
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getMessage(index: string): Message[] {
    return this.messages[index];
    // this.messages.forEach((message) => {
    //   if (message.id == id) {
    //     return message;
    //   }
    // });
    // return null;
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }

    message.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ messageString: string; messages: Message }>(
        'http://localhost:3000/messages',
        message,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.messages.push(responseData.messages);
      });
  }

  getMaxId() {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = Number(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}