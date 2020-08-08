import { Test, TestingModule } from '@nestjs/testing';

import { FlightsService } from 'src/flights/flights.service';
import { FlightsController } from 'src/flights/flights.controller';

describe('AppController', () => {
  let flightsController: FlightsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FlightsController],
      providers: [FlightsService],
    }).compile();

    flightsController = app.get<FlightsController>(FlightsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(flightsController.getHello()).toBe('Hello World!');
    });
  });
});
