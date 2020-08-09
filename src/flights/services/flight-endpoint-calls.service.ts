import { Injectable, HttpService } from '@nestjs/common';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, forkJoin, of, timer, ReplaySubject } from 'rxjs';
import { EasyconfigService } from 'nestjs-easyconfig';
import { AxiosResponse } from 'axios';
import * as NodeCache from 'node-cache';

import { FlightServiceResponse, RoundTripFlightRoute } from 'src/flights/interfaces';

const CACHE_DURATION = 5 * 60; // seconds
const CACHE_CHECK_PERIOD = 10; // seconds
const ENDPOINT_CALL_TIMEOUT = 1000 - 50; // miliseconds, 50ms is reserved for internal operations.

@Injectable()
export class FlightEndpointCallsService {
  private flightEndpointsCache: NodeCache = new NodeCache({ stdTTL: CACHE_DURATION, checkperiod: CACHE_CHECK_PERIOD });

  constructor(private httpService: HttpService, private config: EasyconfigService) {}

  getAllFlightsInformations(): Observable<RoundTripFlightRoute[]> {
    const allEndpointCalls = [this.flightService1(), this.flightService2()];
    return forkJoin(allEndpointCalls).pipe(
      map(results => {
        return results.reduce((acc, current) => [...acc, ...current], []);
      }),
    );
  }

  private flightService1(): Observable<RoundTripFlightRoute[]> {
    const call = this.httpService.get<FlightServiceResponse>('https://discovery-stub.comtravo.com/source1');
    return this.processFlightEndpointCall(call, 'flightService1');
  }

  private flightService2(): Observable<RoundTripFlightRoute[]> {
    const call = this.httpService.get<FlightServiceResponse>('https://discovery-stub.comtravo.com/source2', {
      auth: {
        username: this.config.get('API_USERNAME'),
        password: this.config.get('API_PASSWORD'),
      },
    });
    return this.processFlightEndpointCall(call, 'flightService2');
  }

  private processFlightEndpointCall(call: Observable<AxiosResponse<FlightServiceResponse>>, cacheKey: string): Observable<RoundTripFlightRoute[]> {
    if (this.flightEndpointsCache.has(cacheKey)) {
      return of(this.flightEndpointsCache.get<RoundTripFlightRoute[]>(cacheKey));
    } else {
      // This approach ensures to cache endpoint response even tough it is ignored with timeout in the triggering request
      // 1) Sequential requests will benefit the cache even tough previous request ignores this call with timeout
      // 2) If there is a flight endpoint that never responds under 1 second, there will be a chance for it to appear on the sequential requests
      const subject = new ReplaySubject<RoundTripFlightRoute[]>();

      call
        .pipe(
          map((response: AxiosResponse<FlightServiceResponse>) => response.data.flights),
          tap((flights: RoundTripFlightRoute[]) => {
            this.flightEndpointsCache.set<RoundTripFlightRoute[]>(cacheKey, flights);
          }),
          catchError(() => of([])),
        )
        .subscribe(response => {
          subject.next(response);
          subject.complete();
        });

      timer(ENDPOINT_CALL_TIMEOUT).subscribe(() => {
        subject.next([]);
        subject.complete();
      });

      return subject;
    }
  }
}
