import { of } from 'rxjs';

import { FlightsService } from 'src/flights/services/flights.service';
import { FlightEndpointCallsService } from 'src/flights/services/flight-endpoint-calls.service';
import {
  roundFlight1,
  roundFlight2,
  roundFlight1DiffFlightNumber,
  roundFlight1DiffDates,
  roundFlight2DiffReturn,
  emptyEndpointResponse,
} from 'src/flights/mocks/mock-flights';

describe('Flights Service', () => {
  let mockFlightEndpointCallsService: FlightEndpointCallsService;
  let flightsService: FlightsService;

  beforeEach(() => {
    mockFlightEndpointCallsService = <any>{
      getAllFlightsInformations: jest.fn(),
    };
    flightsService = new FlightsService(mockFlightEndpointCallsService);
  });

  it('should handle empty endpoint response', async () => {
    (<jest.Mock>mockFlightEndpointCallsService.getAllFlightsInformations).mockReturnValueOnce(of([]));
    const result = await flightsService.getFlights().toPromise();
    expect(result).toStrictEqual(emptyEndpointResponse);
  });

  it('should return flights', async () => {
    (<jest.Mock>mockFlightEndpointCallsService.getAllFlightsInformations).mockReturnValueOnce(of([roundFlight1, roundFlight2]));
    const result = await flightsService.getFlights().toPromise();
    expect(result).toStrictEqual({ flights: [roundFlight1, roundFlight2] });
  });

  it('should remove duplicates', async () => {
    (<jest.Mock>mockFlightEndpointCallsService.getAllFlightsInformations).mockReturnValueOnce(of([roundFlight1, roundFlight2, roundFlight1]));
    const result = await flightsService.getFlights().toPromise();
    expect(result).toStrictEqual({ flights: [roundFlight1, roundFlight2] });
  });

  it('should not consider different flight numbers as duplicate', async () => {
    (<jest.Mock>mockFlightEndpointCallsService.getAllFlightsInformations).mockReturnValueOnce(of([roundFlight1, roundFlight1DiffFlightNumber]));
    const result = await flightsService.getFlights().toPromise();
    expect(result).toStrictEqual({ flights: [roundFlight1, roundFlight1DiffFlightNumber] });
  });

  it('should not consider different dates as duplicate', async () => {
    (<jest.Mock>mockFlightEndpointCallsService.getAllFlightsInformations).mockReturnValueOnce(of([roundFlight1, roundFlight1DiffDates]));
    const result = await flightsService.getFlights().toPromise();
    expect(result).toStrictEqual({ flights: [roundFlight1, roundFlight1DiffDates] });
  });

  it('should not consider different round trip as duplicate even there is a common flight in the route', async () => {
    (<jest.Mock>mockFlightEndpointCallsService.getAllFlightsInformations).mockReturnValueOnce(of([roundFlight2, roundFlight2DiffReturn]));
    const result = await flightsService.getFlights().toPromise();
    expect(result).toStrictEqual({ flights: [roundFlight2, roundFlight2DiffReturn] });
  });

  it('should remove duplicates, integration', async () => {
    (<jest.Mock>mockFlightEndpointCallsService.getAllFlightsInformations).mockReturnValueOnce(
      of([
        roundFlight1,
        roundFlight1DiffFlightNumber,
        roundFlight1DiffDates,
        roundFlight2,
        roundFlight2DiffReturn,
        roundFlight1,
        roundFlight1DiffFlightNumber,
        roundFlight1DiffDates,
        roundFlight2,
        roundFlight2DiffReturn,
      ]),
    );
    const result = await flightsService.getFlights().toPromise();
    expect(result).toStrictEqual({
      flights: [roundFlight1, roundFlight1DiffFlightNumber, roundFlight1DiffDates, roundFlight2, roundFlight2DiffReturn],
    });
  });
});
