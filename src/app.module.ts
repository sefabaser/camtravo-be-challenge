import { Module } from '@nestjs/common';
import { EasyconfigModule } from 'nestjs-easyconfig';

import { FlightsModule } from 'src/flights/flights.module';

@Module({
  imports: [FlightsModule, EasyconfigModule.register({ path: './envirenments/.env' })],
  controllers: [],
  providers: [],
})
export class AppModule {}
