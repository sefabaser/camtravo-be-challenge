import { Module } from '@nestjs/common';

import { FlightsController } from 'src/flights/flights.controller';
import { FlightsService } from 'src/flights/flights.service';

@Module({
  imports: [],
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class AppModule {}
