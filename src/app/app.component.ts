import {ChangeDetectionStrategy, Component, ElementRef, SimpleChanges, ViewChild} from '@angular/core';
import {BasicComponent} from "./basic/basic.component";
import {WebsocketServiceService} from "./websocket-service.service";
import {UsersComponent} from "./users/users.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('messageDiv') private div: ElementRef | undefined;
  title = 'WattsApp';
  lines: {name: string, message: string, time: string}[] = [];

  constructor(websocketService: WebsocketServiceService) {
    websocketService.registerEndpoint("message", this.lines, (arg: {content: string, sender: string}) =>
      {
        this.lines.push({name: arg.sender || 'anonymous', message: arg.content, time: new Date().toLocaleTimeString('en-GB')});
      }
    );
    websocketService.registerCloseAction(this.lines, () => {
      this.lines.push({name: "[server]", message: "DISCONNECTED", time: new Date().toLocaleTimeString('en-GB')})
    })
 }
  ngAfterViewChecked() {
    (this.div as ElementRef).nativeElement.scrollTop = (this.div as ElementRef).nativeElement.scrollHeight;
  }
}
