import { Module, HttpModule } from '@nestjs/common';

import { FlightsController } from 'src/flights/flights.controller';
import { FlightsService } from 'src/flights/services/flights.service';
import { FlightEndpointCallsService } from 'src/flights/services/flight-endpoint-calls.service';

@Module({
  imports: [HttpModule],
  controllers: [FlightsController],
  providers: [FlightsService, FlightEndpointCallsService],
})
export class FlightsModule {}
