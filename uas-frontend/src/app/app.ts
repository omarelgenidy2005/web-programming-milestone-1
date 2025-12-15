import { Component, signal, OnInit, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MonitoringService } from './services/monitoring.service';
import { SoundService } from './services/sound.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('uas-frontend');

  constructor(
    private monitoringService: MonitoringService,
    private soundService: SoundService
  ) {}

  ngOnInit() {
    this.monitoringService.init();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Play sound if clicking a button or link
    if (target.closest('button') || target.closest('a') || target.closest('.btn')) {
      this.soundService.playClickSound();
    }
  }
}
