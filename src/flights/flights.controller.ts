import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';

import { FlightsService } from 'src/flights/services/flights.service';
import { FlightServiceResponse } from 'src/flights/interfaces';

@Controller('flights')
export class FlightsController {
  constructor(private flightsService: FlightsService) {}

  @Get()
  getFlights(): Observable<FlightServiceResponse> {
    return this.flightsService.getFlights();
  }
}
