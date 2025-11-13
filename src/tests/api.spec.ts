import { log } from 'console';
import { test, expect } from 'playwright/test';
import { ApiCalls } from '../utils/apiCalls.utils';
import { faker } from '@faker-js/faker';
import { User } from '../interfaces/user.interface';

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
    let demoUserData: User = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password( { length: 10 }),
      phone: '',
      company: ''
    };
    let token: string;

    await test.step('Health Check', async () => {
      log('Performing health check...');  
      const response = await apiCalls.healthCheck( request, baseURL!);
      expect(response.status).toBe(200);
      log('Health check passed with status 200.');
    });

    await test.step('Register an user', async () => {
      log('Creating a new user: ' + demoUserData.name + ', ' + demoUserData.email);  
      const response = await apiCalls.registerUser( 
        request, 
        baseURL!,
        demoUserData.name,
        demoUserData.email,
        demoUserData.password
      );
      expect(await response.status).toBe(201);
      log('User registration passed with status 201.');
    });

    await test.step('Login', async () => {
      log('Logging in with: ' + demoUserData.email + ', password: ' + demoUserData.password);  
      const response = await apiCalls.login( 
        request, 
        baseURL!,
        demoUserData.email,
        demoUserData.password
      );
      expect(await response.status).toBe(200);
      log('User login passed with status 200.');
      token = await response.data.token;
    });

    await test.step('Update profile', async () => {
      log('Updating profile for user: ' + demoUserData.name);  
      log(`New name: ${demoUserData.name = faker.person.fullName()}`);
      log(`New phone: ${demoUserData.phone = faker.phone.number({ style: 'international' })}`);
      log(`New company: ${demoUserData.company = faker.company.name()}`);
      
    });


    
  });
});



