import { log } from 'console';
import { test, expect } from 'playwright/test';
import { ApiCalls } from '../utils/apiCalls.utils';
import { faker } from '@faker-js/faker';

test.describe('ExpandTesting.com API tests', {
  tag: ['@api', '@ExpandTesting'],
  annotation: [ 
    { type: 'test', description: 'API test case demo' },
  ]
}, () => {

  test('API test case demo using the flow in expandtestin.com', async ({ 
    request,
    baseURL
  }, testinfo) => {  
    log(`Starting test: ${testinfo.title}`);
    log(`Base URL is: ${baseURL}`);    
    const apiCalls = new ApiCalls();
    const fullName = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password( { length: 10 });

    await test.step('Health Check', async () => {
      log('Performing health check...');  
      const response = await apiCalls.healthCheck( request, baseURL!);
      expect(response.status).toBe(200);
      log('Health check passed with status 200.');
    });

    await test.step('Register an user', async () => {
      log('Creating a new user: ' + fullName + ', ' + email);  
      const response = await apiCalls.registerUser( 
        request, 
        baseURL!,
        fullName,
        email,
        password
      );
      expect(response.status).toBe(201);
      log('User registration passed with status 201.');
    });

    await test.step('Login', async () => {
      log('Logging in with: ' + email + ', password: ' + password);  
      const response = await apiCalls.login( 
        request, 
        baseURL!,
        email,
        password
      );
      expect(response.status).toBe(200);
      log('User login passed with status 200.');
    });


    
  });
});



