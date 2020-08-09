import { of } from 'rxjs';

import { FlightsController } from 'src/flights/flights.controller';
import { FlightsService } from 'src/flights/services/flights.service';
import { emptyEndpointResponse } from 'src/flights/mocks/mock-flights';

describe('Flights Controller', () => {
  let mockFlightsService: FlightsService;
  let flightsController: FlightsController;

  beforeEach(() => {
    mockFlightsService = <any>{
      getFlights: jest.fn(),
    };
    flightsController = new FlightsController(mockFlightsService);
  });

  it('getFlights should receive the data from flightService.getFlights', () => {
    (<jest.Mock>mockFlightsService.getFlights).mockReturnValue(of(emptyEndpointResponse));
    flightsController.getFlights();
    expect(mockFlightsService.getFlights).toHaveBeenCalled();
  });
});
