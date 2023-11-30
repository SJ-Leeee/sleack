import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: /\/ws-.+/ })
export class EventsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer() public server: Server;
  // app.set('io',io) 과 같은 역할
  @SubscribeMessage('test')
  handleTest(@MessageBody() data: string) {
    console.log('test', data);
  }
  // @SubscribeMessage('reload')
  // handleReload(@MessageBody() data: string) {
  //   console.log('test', data);
  // }  socket.on 역할

  afterInit(server: Server): any {
    console.log('websocket On !!');
  }
  handleConnection(client: any, ...args: any[]) {}
  handleDisconnect(client: any) {}
}
