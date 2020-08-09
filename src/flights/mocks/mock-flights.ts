import { RoundTripFlightRoute, FlightServiceResponse } from 'src/flights/interfaces';
import { AxiosResponse } from 'axios';

export const roundFlight1: RoundTripFlightRoute = {
  slices: [
    {
      origin_name: 'Schonefeld',
      destination_name: 'Stansted',
      departure_date_time_utc: '2019-08-08T16:00:00.000Z',
      arrival_date_time_utc: '2019-08-08T17:55:00.000Z',
      flight_number: '146',
      duration: 115,
    },
    {
      origin_name: 'Stansted',
      destination_name: 'Schonefeld',
      departure_date_time_utc: '2019-08-10T18:00:00.000Z',
      arrival_date_time_utc: '2019-08-10T20:00:00.000Z',
      flight_number: '8544',
      duration: 120,
    },
  ],
  price: 130.1,
};

export const roundFlight1DiffFlightNumber: RoundTripFlightRoute = {
  slices: [
    {
      origin_name: 'Schonefeld',
      destination_name: 'Stansted',
      departure_date_time_utc: '2019-08-08T16:00:00.000Z',
      arrival_date_time_utc: '2019-08-08T17:55:00.000Z',
      flight_number: '500',
      duration: 115,
    },
    {
      origin_name: 'Stansted',
      destination_name: 'Schonefeld',
      departure_date_time_utc: '2019-08-10T18:00:00.000Z',
      arrival_date_time_utc: '2019-08-10T20:00:00.000Z',
      flight_number: '501',
      duration: 120,
    },
  ],
  price: 130.1,
};

export const roundFlight1DiffDates: RoundTripFlightRoute = {
  slices: [
    {
      origin_name: 'Schonefeld',
      destination_name: 'Stansted',
      departure_date_time_utc: '2019-09-08T16:00:00.000Z',
      arrival_date_time_utc: '2019-09-08T17:55:00.000Z',
      flight_number: '146',
      duration: 115,
    },
    {
      origin_name: 'Stansted',
      destination_name: 'Schonefeld',
      departure_date_time_utc: '2019-09-10T18:00:00.000Z',
      arrival_date_time_utc: '2019-09-10T20:00:00.000Z',
      flight_number: '8544',
      duration: 120,
    },
  ],
  price: 130.1,
};

export const roundFlight2: RoundTripFlightRoute = {
  slices: [
    {
      origin_name: 'Schonefeld',
      destination_name: 'Stansted',
      departure_date_time_utc: '2019-08-08T08:00:00.000Z',
      arrival_date_time_utc: '2019-08-08T10:00:00.000Z',
      flight_number: '8543',
      duration: 120,
    },
    {
      origin_name: 'Stansted',
      destination_name: 'Schonefeld',
      departure_date_time_utc: '2019-08-10T06:50:00.000Z',
      arrival_date_time_utc: '2019-08-10T08:40:00.000Z',
      flight_number: '145',
      duration: 110,
    },
  ],
  price: 147.9,
};

export const roundFlight2DiffReturn: RoundTripFlightRoute = {
  slices: [
    {
      origin_name: 'Schonefeld',
      destination_name: 'Stansted',
      departure_date_time_utc: '2019-08-08T08:00:00.000Z',
      arrival_date_time_utc: '2019-08-08T10:00:00.000Z',
      flight_number: '8543',
      duration: 120,
    },
    {
      origin_name: 'Stansted',
      destination_name: 'Schonefeld',
      departure_date_time_utc: '2019-08-10T18:00:00.000Z',
      arrival_date_time_utc: '2019-08-10T20:00:00.000Z',
      flight_number: '8544',
      duration: 120,
    },
  ],
  price: 130.1,
};

export const emptyEndpointResponse: FlightServiceResponse = { flights: [] };
export const sampleEndpointResponse: FlightServiceResponse = { flights: [roundFlight1, roundFlight2] };

export const failedHttpResponse: AxiosResponse = {
  data: 'Service Unavailable',
  status: 400,
  statusText: 'Service Unavailable',
  headers: {},
  config: {},
};

export const emptyHttpResponse: AxiosResponse = {
  data: emptyEndpointResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

export const sampleHttpResponse: AxiosResponse = {
  data: sampleEndpointResponse,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};
