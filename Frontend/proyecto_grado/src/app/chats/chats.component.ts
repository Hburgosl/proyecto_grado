import { Component } from '@angular/core';
import { ChatService } from './chat.service';
import { Chat } from '../chat/chat';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent {
  chats: Chat[];
  constructor(private chatService: ChatService, private router: Router) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getChats();
  }

  getChats() {
    this.chatService.getChatsUsuario(1234197828).subscribe(
      (data) => {
        this.chats = data;
        console.log(this.chats);
      },
      (error) => {
        console.log('Error al obtener los chats', error);
      }
    );
  }

  irADetalleChat() {
    this.router.navigate(['/chat']);
  }
}
