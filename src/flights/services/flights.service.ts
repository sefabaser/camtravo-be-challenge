import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { FlightServiceResponse, RoundTripFlightRoute, FlightRoute } from 'src/flights/interfaces';
import { FlightEndpointCallsService } from 'src/flights/services/flight-endpoint-calls.service';

@Injectable()
export class FlightsService {
  constructor(private flightEndpointCallsService: FlightEndpointCallsService) {}

  getFlights(): Observable<FlightServiceResponse> {
    return this.flightEndpointCallsService.getAllFlightsInformations().pipe(
      map(allFlights => {
        return { flights: this.removeDuplicates(allFlights) };
      }),
    );
  }

  private removeDuplicates(flights: RoundTripFlightRoute[]): RoundTripFlightRoute[] {
    const flightUniqueIdentifiers = new Set<string>();

    return flights
      .map(flight => {
        return {
          original: flight,
          identifier: this.getUniqueIdentifierForRoundTrip(flight.slices),
        };
      })
      .reduce((acc, current) => {
        if (!flightUniqueIdentifiers.has(current.identifier)) {
          flightUniqueIdentifiers.add(current.identifier);
          acc.push(current);
        }
        return acc;
      }, [])
      .map(flightsWithIdentifiers => flightsWithIdentifiers.original);
  }

  private getUniqueIdentifierForRoundTrip(rountTrip: FlightRoute[]): string {
    return rountTrip.reduce((acc, current) => {
      return `${acc}${current.flight_number}${current.departure_date_time_utc}${current.arrival_date_time_utc}`;
    }, '');
  }
}
