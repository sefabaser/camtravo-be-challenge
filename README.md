
## Information That Is Received From The Product
The details of the product requests are filled by the assumptions as described below.

- Response time shall never exceed one second.
- The aim of this endpoint is to return all flights that is available within one second, even tough some flight endpoint calls fails.
  Having more flight information in response is better than not having them. If customer sees more, the convertion will be higher.
- In the future there will be many other flight endpoints be added, for now we are only starting with two.
- The information received from flight services can be considered as valid for the next 5 minutes. (only if endpoint call responds with success)
- Unique identifier for flights is; flight_number + flight dates.
- Round trip will be considered duplicate, only if there is another rount trip with the same flight identifiers.
  Having some common flights is not considered duplicate as long as there is one unique flight in the round trip.

## Endpoints
- GET: {{base}}/flights

## Installation

```bash
$ npm install
```

**IMPORTANT!** Create envirenment file `/envirenments/.env` and set envirenment variables
- API_USERNAME
- API_PASSWORD

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
