import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  imports: [JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  swUpdateService = inject(SwUpdate);

  todos=httpResource(()=>"http://localhost:3000/todos");

  protected readonly title = signal('pwa-app');

    constructor() {
    this.swUpdateService.versionUpdates.subscribe((evt: any) => {
        console.log(evt.type,evt.version?.hash,evt.latestVersion?.hash);
    })
    }



}
