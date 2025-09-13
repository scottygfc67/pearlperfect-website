'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Core Web Vitals monitoring
    const reportWebVitals = (metric: any) => {
      console.log('Web Vital:', metric);
      
      // Send to analytics service
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.value),
          non_interaction: true,
        });
      }
    };

    // Basic performance monitoring without web-vitals dependency
    console.log('Performance monitoring initialized');

    // Performance timing
    const measurePerformance = () => {
      if (typeof window !== 'undefined' && window.performance) {
        const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        console.log('Performance Metrics:', {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          totalTime: navigation.loadEventEnd - navigation.fetchStart,
        });
      }
    };

    // Measure after page load
    window.addEventListener('load', measurePerformance);

    return () => {
      window.removeEventListener('load', measurePerformance);
    };
  }, []);

  return null;
}
