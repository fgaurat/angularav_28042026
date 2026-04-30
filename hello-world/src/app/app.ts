import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'hello-world';


  onKeyUp(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    this.title = input.value;
  }
}
