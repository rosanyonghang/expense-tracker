import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ transports: ['websocket'] })
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  // constructor(@Inject('NotificationsGateway') private notificationGateway) {}

  init(socketIoServer: Server) {
    this.server = socketIoServer;
  }

  handleConnection(client: Socket) {
    // Handle new client connection
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    // Handle client disconnection
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('notification/:123')
  handleNotification(client: Socket, payload: any) {
    // Handle received notification
    console.log('Received notification:', payload);
    // Perform any necessary actions based on the notification

    // Send acknowledgement to the client
    client.emit('notification_ack', { status: 'received' });
  }

  testNotification(message: string) {
    this.server.emit('notification/123', message);
  }
}
