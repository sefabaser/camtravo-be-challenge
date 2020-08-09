import { HttpService } from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { delay, timeout } from 'rxjs/operators';
import { EasyconfigService } from 'nestjs-easyconfig';

import { FlightEndpointCallsService } from 'src/flights/services/flight-endpoint-calls.service';
import { sampleHttpResponse, emptyHttpResponse, failedHttpResponse } from 'src/flights/mocks/mock-flights';

describe('Flight Endpoint Calls Service', () => {
  let mockHttpService: HttpService;
  let mockConfigService: EasyconfigService;
  let flightEndpointCallsService: FlightEndpointCallsService;

  beforeEach(() => {
    mockHttpService = <any>{ get: jest.fn() };
    mockConfigService = <any>{ get: () => '' };
    flightEndpointCallsService = new FlightEndpointCallsService(mockHttpService, mockConfigService);
  });

  it('should handle empty endpoint responses', async () => {
    (<jest.Mock>mockHttpService.get).mockReturnValue(of(emptyHttpResponse));
    const response = await flightEndpointCallsService.getAllFlightsInformations().toPromise();
    expect(response).toStrictEqual([]);
  });

  it('should return flights', async () => {
    (<jest.Mock>mockHttpService.get).mockReturnValueOnce(of(sampleHttpResponse));
    (<jest.Mock>mockHttpService.get).mockReturnValue(of(emptyHttpResponse));
    const response = await flightEndpointCallsService.getAllFlightsInformations().toPromise();
    expect(response).toStrictEqual(sampleHttpResponse.data.flights);
  });

  it('should not fail with failed endpoint calls', async () => {
    (<jest.Mock>mockHttpService.get).mockReturnValue(throwError(failedHttpResponse));
    const response = await flightEndpointCallsService.getAllFlightsInformations().toPromise();
    expect(response).toStrictEqual([]);
  });

  it('response time should not exceed one second', async done => {
    (<jest.Mock>mockHttpService.get).mockReturnValue(of(emptyHttpResponse).pipe(delay(1001)));
    flightEndpointCallsService
      .getAllFlightsInformations()
      .pipe(timeout(1000))
      .subscribe(() => done());
  });

  it('should cache previous successful endpoint calls', async () => {
    (<jest.Mock>mockHttpService.get).mockReturnValueOnce(of(sampleHttpResponse));
    (<jest.Mock>mockHttpService.get).mockReturnValue(of(emptyHttpResponse));

    await flightEndpointCallsService.getAllFlightsInformations().toPromise();
    const response = await flightEndpointCallsService.getAllFlightsInformations().toPromise();
    expect(response).toStrictEqual(sampleHttpResponse.data.flights);
  });

  it('should cache previous successful endpoint calls even it is ignored by timeout in the first request', async () => {
    (<jest.Mock>mockHttpService.get).mockReturnValueOnce(of(sampleHttpResponse).pipe(delay(1100)));
    (<jest.Mock>mockHttpService.get).mockReturnValue(of(emptyHttpResponse));

    const response1 = await flightEndpointCallsService.getAllFlightsInformations().toPromise();
    expect(response1).toStrictEqual([]);

    await new Promise(resolve => setTimeout(() => resolve(), 200)); // Wait until first delayed call to be completed

    const response2 = await flightEndpointCallsService.getAllFlightsInformations().toPromise();
    expect(response2).toStrictEqual(sampleHttpResponse.data.flights);
  });
});
