import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Add } from '../add';

@Component({
  selector: 'app-add-service',
  imports: [FormsModule],
  templateUrl: './add-service.html',
  styleUrl: './add-service.css',
})
export class AddService {
  private readonly addService = inject(Add);

  public val1: number = 0;
  public val2: number = 0;
  public result: number = 0;

  compute(): number {
    this.result = this.addService.add(Number(this.val1), Number(this.val2));
    return this.result;
  }
}
