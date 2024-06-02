import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

import { Server as SocketIOServer, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: true } })
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  io: SocketIOServer;

  private connectedClients = new Map<string, Socket>();

  handleConnection(clientSocket: Socket) {
    // get user id
    // add to this.connectedClients
    // set online status
  }
}

/*

import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Server, Socket } from 'socket.io';
import { AuthHelper } from 'src/auth/auth.helper';
import { HttpException, HttpStatus } from '@nestjs/common';
import { RoleEnum } from 'src/common/enums/roles.enum';
import { UsersService } from 'src/users/users.service';
import { EventsService } from 'src/events/events.service';

@WebSocketGateway({
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UsersService,
    private readonly helper: AuthHelper,
    private readonly eventService: EventsService,
  ) {}

  @WebSocketServer()
  server: Server;

  connectedClients = new Map<string, Socket>();

  afterInit(server: any) {
    console.log('Initialized');
  }

  async handleConnection(socket: Socket, _: any) {
    try {
      const token = socket?.handshake?.query?.token
        ? socket?.handshake?.query?.token
        : socket.handshake.headers.authorization;

      const decoded = await this.helper.decode(token as string);

      if (!decoded)
        throw new HttpException('Invalid token', HttpStatus.NOT_ACCEPTABLE);

      const user = await this.helper.validateUser(decoded);
      socket.data.user = user;
      socket.data.token = token;
      socket.data.connectionTime = Date.now();

      this.connectedClients.set(user?.id, socket);

      await this.userService.updateOnlineStatus(user?.id, true);
      this.attachEvents(socket);
    } catch (error) {
      socket.disconnect();
    }
  }

  async handleDisconnect(socket: Socket) {
    await this.updateUserStatusAndRemoveClient(socket);
  }

  attachEvents(socket: Socket) {
    socket.on('ping', () => {
      socket.emit('pong');
    });

    socket.on('disconnect', async () => {
      await this.updateUserStatusAndRemoveClient(socket);
    });
  }

  async updateUserStatusAndRemoveClient(socket: Socket) {
    await this.userService.updateOnlineStatus(socket?.data?.user?.id, false);
    this.connectedClients.delete(socket?.data?.user?.id);
  }

  @SubscribeMessage('sendMessage')
  async create(@MessageBody() createChatDto, socket: Socket) {
    const res = await this.chatService.create(createChatDto);
    if (res) {
      const senderSocket = this.connectedClients.get(createChatDto.sender); //todo get send to reciever not sender
      if (senderSocket) {
        senderSocket.emit('receiveMessage', createChatDto);
      }
    }
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }

  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }

  public async sendEventInvitationNotification(
    userId: string,
    eventId: number,
  ) {
    const recipientSocket = this.connectedClients.get(userId);
    if (recipientSocket) {
      const eventDetails = await this.eventService.findOne(eventId);
      recipientSocket.emit('eventInvitation', {
        message: `You've been invited to an event: ${eventDetails.title}`,
        eventDetails,
      });
    }
  }
}


*/
