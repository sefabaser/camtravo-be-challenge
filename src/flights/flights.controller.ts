import { Controller, Get } from '@nestjs/common';

import { FlightsService } from 'src/flights/flights.service';

@Controller()
export class FlightsController {
  constructor(private readonly appService: FlightsService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
