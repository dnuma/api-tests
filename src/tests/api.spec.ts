import { log } from 'console';
import { test, expect } from 'playwright/test';
import { ApiCalls } from '../utils/apiCalls.utils';
import { fa, faker } from '@faker-js/faker';
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
    const oldUserData: User = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password( { length: 10 }),
      phone: '',
      company: ''
    };
    let newUserData: User = {
      name: faker.person.fullName(),
      email: oldUserData.email,
      password: oldUserData.password,
      phone: faker.phone.number({ style: 'international' }),
      company: faker.company.name()
    }
    let token: string;

    await test.step('Health Check', async () => {
      log('Performing health check...');  
      const response = await apiCalls.healthCheck( request, baseURL!);
      expect(response.status).toBe(200);
      log('Health check passed with status 200.');
    });

    await test.step('Register an user', async () => {
      log('Creating a new user: ' + oldUserData.name + ', ' + oldUserData.email);  
      const response = await apiCalls.registerUser( 
        request, 
        baseURL!,
        oldUserData.name,
        oldUserData.email,
        oldUserData.password
      );
      expect(await response.status).toBe(201);
      log('User registration passed with status 201.');
    });

    await test.step('Login', async () => {
      log('Logging in with: ' + oldUserData.email + ', password: ' + oldUserData.password);  
      const response = await apiCalls.login( 
        request, 
        baseURL!,
        oldUserData.email,
        oldUserData.password
      );
      expect(await response.status).toBe(200);
      log('User login passed with status 200.');
      token = await response.data.token;
    });

    await test.step('Get Profile info', async () => {
      log('Get Profile info for: ' + oldUserData.email + ', ' + oldUserData.name);  
      const response = await apiCalls.getUserInfo( 
        request, 
        baseURL!,
        token
      );
      expect(await response.status).toBe(200);
      log('User data retrieved succesfully. Validating data integrity...');
      expect(await response.data.name.toLowerCase()).toBe(oldUserData.name.toLowerCase());
      expect(await response.data.email.toLowerCase()).toBe(oldUserData.email.toLowerCase());
      log('Data integrity validated successfully.');
    });

    await test.step('Update profile', async () => {
      log('Updating profile for user: ' + oldUserData.name);  
      log(`New name: ${newUserData.name}`);
      log(`New phone: ${newUserData.phone}`);
      log(`New company: ${newUserData.company}`);

      const response = await apiCalls.patchUser(
        request,
        baseURL!,
        token,
        newUserData.name,
        newUserData.phone,
        newUserData.company
      );
      expect(await response.status).toBe(200);
      log('User data udpated succesfully. Validating data integrity...');

      const newResponse = await apiCalls.getUserInfo( 
        request, 
        baseURL!,
        token
      );
      expect(await newResponse.data.name.toLowerCase()).toBe(newUserData.name.toLowerCase());
      expect(await newResponse.data.phone.toLowerCase()).toBe(newUserData.phone.toLowerCase());
      expect(await newResponse.data.company.toLowerCase()).toBe(newUserData.company.toLowerCase());
      log('Data integrity validated successfully.');      
    });

    await test.step('Logout user', async () => {
      log('Loging out user: ' + oldUserData.name);  

      const newResponse = await apiCalls.logout( 
        request, 
        baseURL!,
        token
      );
      expect(await newResponse.status).toBe(200);
      log('User logged out successfully.');

      log(`Validating token is no longer valid after logout...`);
      await apiCalls.getUserInfo( 
        request, 
        baseURL!,
        token
      ).catch( error => {
        log('Expected error received: ' + error.message);
        expect(error.message).toContain('Get user profile info failed');
      });
      log('Token invalidation after logout validated successfully.');
    });

    await test.step('Cleanup - Delete user', async () => {
      log('Cleaning up: Deleting user: ' + oldUserData.name);

      // We need to get a new token since the previous one was invalidated at logout
      const response = await apiCalls.login( 
        request, 
        baseURL!,
        oldUserData.email,
        oldUserData.password
      );
      expect(await response.status).toBe(200);
      token = await response.data.token;

      const deleteResponse = await apiCalls.deleteUser(
        request,
        baseURL!,
        token
      );
      expect(await deleteResponse.status).toBe(200);

      log('User deleted successfully. Validating the user cannot login anymore...');
      await apiCalls.login( 
        request, 
        baseURL!,
        newUserData.email,
        newUserData.password
      ).catch( error => {
        log('Expected error received: ' + error.message);
        expect(error.message).toContain('User login failed');
      });
      log('User delete successfully confirmed.');
    });
    
  });
});



