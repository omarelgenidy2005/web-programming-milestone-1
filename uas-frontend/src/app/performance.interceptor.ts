import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { MonitoringService } from './services/monitoring.service';

export const performanceInterceptor: HttpInterceptorFn = (req, next) => {
  const monitoringService = inject(MonitoringService);
  const startTime = performance.now();

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          const duration = performance.now() - startTime;
          // Log only API requests, exclude assets/other
          if (req.url.includes('/api/')) {
            monitoringService.logMetric('API Latency', Math.round(duration));
          }
        }
      },
      error: (error) => {
        const duration = performance.now() - startTime;
        if (req.url.includes('/api/')) {
          monitoringService.logMetric('API Error Latency', Math.round(duration));
        }
      }
    })
  );
};
