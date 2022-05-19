import {Component, ElementRef, Injectable, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {WebsocketServiceService} from "../websocket-service.service";

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  @ViewChild('usersDiv') private div: ElementRef | undefined;
  username: string = "";
  users: string[] = [];
  websocketService: WebsocketServiceService;

  constructor(websocketService: WebsocketServiceService) {
    this.websocketService = websocketService;
    websocketService.registerEndpoint("joined", this.users, (arg: {name: string}) => {
    this.users.push(arg.name);
  });
}

  onSend() {
    console.log(this.username);
    this.websocketService.ws.send(JSON.stringify({action: "registername", data: this.username}));
  }
  ngAfterViewChecked() {
    (this.div as ElementRef).nativeElement.scrollTop = (this.div as ElementRef).nativeElement.scrollHeight;
  }
}
