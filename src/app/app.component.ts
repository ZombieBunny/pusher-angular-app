import { Component, OnInit } from '@angular/core';
import * as Pusher from 'pusher-js';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  public pusherClient;
  public channel;
  public message = '';
  public messages = [];

  title = 'chat-app-angular';

  constructor(private http: HttpClient) {

    this.pusherClient = new Pusher('621ee746824ccbe9eaf8', { cluster: 'ap2' });
    this.channel = this.pusherClient.subscribe('channel');

    this.channel.bind('event', (data) => {
      console.log(data);
      this.messages.push(data.message);
    });
  }

  ngOnInit() {
    // do something when component loads
  }


  public sendMessage(): void {
    console.log('send');
    this.http.post('http://localhost:3000/message', { message: this.message }).subscribe(res => {
      console.log(res);
    });
    this.message = '';
  }



}
