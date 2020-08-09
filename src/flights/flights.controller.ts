import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';

import { FlightsService } from 'src/flights/services/flights.service';
import { FlightServiceResponse } from 'src/flights/interfaces';

@Controller('flights')
export class FlightsController {
  constructor(private readonly appService: FlightsService) {}

  @Get()
  getFlights(): Observable<FlightServiceResponse> {
    return this.appService.getFlights();
  }
}
