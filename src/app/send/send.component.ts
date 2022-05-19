import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WebsocketServiceService} from "../websocket-service.service";

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {
  message: string;

  constructor(private websocketService: WebsocketServiceService) {
    this.message="";
    this.websocketService = websocketService;
  }

  ngOnInit(): void {
  }

  onSend(): void {
    let data = this.message;
    this.websocketService.ws.send(JSON.stringify({action: "sendmessage", data: data}));
    this.message="";
  }
}
