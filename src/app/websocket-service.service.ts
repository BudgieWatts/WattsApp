import {Injectable} from '@angular/core';
import {Websocket, WebsocketBuilder, WebsocketEvents} from 'websocket-ts';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WebsocketServiceService {
  ws: Websocket;

  constructor() {
    console.log("Constructing Websocket thing")
    this.ws = new WebsocketBuilder(environment.websocketUrl).onOpen((i, ev) => {
      console.log("opened");
      console.log(ev);
    })
      .onClose((i, ev) => {
        console.log("closed")
      })
      .onError((i, ev) => {
        console.log("error")
      })
      .onMessage((i, ev) => {
        console.log("message: " + ev.data);
      })
      .onRetry((i, ev) => {
        console.log("retry")
      })
      .build();
  }
  registerEndpoint( type: string, destination: any[], wrangler: Function) {
    console.log("Websocket service endpoint registration");
    this.ws.addEventListener(WebsocketEvents.message, (instance, event) => {
      console.log("Received event " + JSON.stringify(event));
      let command = JSON.parse(event.data)
      if (command.type === type) {
        console.log("Type was " + type)
        wrangler(command, destination);
      }
    })
  }
  registerCloseAction(destination: any[], wrangler: Function) {
    this.ws.addEventListener(WebsocketEvents.close, (instance, event) => {
      console.log("Close event received")
        wrangler(destination);
    })
}
}
