import { Injectable } from '@angular/core';
import LogRocket from 'logrocket';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {

  constructor() { }

  init() {
    // Replace with your actual App ID from LogRocket dashboard
    LogRocket.init('your-app-id/uas-app');
  }

  identifyUser(user: any) {
    LogRocket.identify(user.id, {
      name: user.name,
      email: user.email,
      role: user.role
    });
  }

  logEvent(eventName: string, data?: any) {
    console.log(`[Event] ${eventName}`, data);
  }

  logMetric(metricName: string, value: number, unit: string = 'ms') {
    // Log in a structured format that LogRocket can easily search/filter
    console.info(`[Metric] ${metricName}: ${value}${unit}`, { value, unit });
    
    // In a real LogRocket setup, you might send this to a custom analytics endpoint
    // or rely on LogRocket's automatic performance monitoring.
    // For this demo, we use console.info which LogRocket records.
  }
}
