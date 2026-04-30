import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add',
  imports: [FormsModule],
  templateUrl: './add.html',
  styleUrl: './add.css',
})
export class Add {
  public val1: number = 0;
  public val2: number = 0;
  public result: number = 0;
  sum(): number {
    this.result = Number(this.val1) + Number(this.val2);
    return this.result;
  }


}
