import { Component, signal, OnInit, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { MonitoringService } from './services/monitoring.service';
import { SoundService } from './services/sound.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('uas-frontend');
  private navStartTime: number = 0;

  constructor(
    private monitoringService: MonitoringService,
    private soundService: SoundService,
    private router: Router
  ) {}

  ngOnInit() {
    this.monitoringService.init();
    this.setupNavigationMonitoring();
  }

  private setupNavigationMonitoring() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.navStartTime = performance.now();
      }
      
      if (event instanceof NavigationEnd) {
        const duration = performance.now() - this.navStartTime;
        this.monitoringService.logMetric('Route Navigation', Math.round(duration));
      }
    });
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
