import test, { expect } from 'playwright/test';

test.describe('Test Suite', {
  tag: ['@suite', '@smoke'],
  annotation: [ 
    { type: 'issue', description: 'JIRA-1234' },
  ]
}, () => {

  test('has title', async ({ page }) => {  
    await expect(page).toHaveTitle('Swag Labs');
  });

  test('login', async ({ page }) => {

  });

});



