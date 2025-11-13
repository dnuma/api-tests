import { APIRequestContext } from "@playwright/test";
import { log } from "console";

export class ApiCalls {

  async healthCheck(
    request: APIRequestContext,
    url: string
  ) {
    const response = await request.get(`${url}/health-check`);
		if (!response.ok()) {
    throw new Error(`Health check failed with status ${response.status()} - ${response.statusText()}`);
  }
    return await response.json();
  }

	async registerUser(
		request: APIRequestContext,
		url: string,
		fullName: string,
		email: string,
		password: string
	) {
		const response = await request.post(`${url}/users/register`, {
			headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
      },
			form: {
				name: fullName,
				email: email,
				password: password
			}
		});
		if (!response.ok()) {
			throw new Error(`User registration failed with status ${response.status()} - ${response.statusText()}`);
		}
		return await response.json();
	}

	async login(
		request: APIRequestContext,
		url: string,
		email: string,
		password: string
	) {
		const response = await request.post(`${url}/users/login`, {
			headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json'
      },
			form: {
				email: email,
				password: password
			}
		});
		if (!response.ok()) {
			throw new Error(`User login failed with status ${response.status()} - ${response.statusText()}`);
		}
		return await response.json();
	}

}