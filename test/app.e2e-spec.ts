import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpService } from '@nestjs/common';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import * as request from 'supertest';

import { AppModule } from 'src/app.module';
import { emptyHttpResponse } from 'src/flights/mocks/mock-flights';

describe('FlightsController (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    httpService = moduleFixture.get<HttpService>(HttpService);
    await app.init();
  });

  it('GET: /flights', () => {
    jest.spyOn(httpService, 'get').mockImplementation(() => of(emptyHttpResponse));

    return request(app.getHttpServer())
      .get('/flights')
      .expect(200);
  });

  it('GET: /flights response time should never exceed one second', () => {
    jest.spyOn(httpService, 'get').mockImplementation(() => of(emptyHttpResponse).pipe(delay(1010)));

    return request(app.getHttpServer())
      .get('/flights')
      .timeout(1000)
      .expect(200);
  });
});
