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

	async getUserInfo(
		request: APIRequestContext,
		url: string,
		token: string
	)	{
		const response = await request.get(`${url}/users/profile`, {
			headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json',
				'x-auth-token': token
      },
			
		});
		if (!response.ok()) {
			throw new Error(`Get user profile info failed: ${response.status()} - ${response.statusText()}`);
		}
		return await response.json();
	}

	async patchUser(
		request: APIRequestContext,
		url: string,
		token: string,
		newName: string,
		newPhone: string,
		newCompany: string
	) {
		const response = await request.patch(`${url}/users/profile`, {
			headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json',
				'x-auth-token': token
      },
			form: {
				name: newName,
				phone: newPhone,
				company: newCompany
			}, 
		});
		if (!response.ok()) {
			throw new Error(`User Update failed with status ${response.status()} - ${response.statusText()}`);
		}
		return await response.json();
	}

	async logout(
		request: APIRequestContext,
		url: string,
		token: string
	) {
		const response = await request.delete(`${url}/users/logout`, {
			headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json',
				'x-auth-token': token
      },
		});
		if (!response.ok()) {
			throw new Error(`Token invalidation failed: ${response.status()} - ${response.statusText()}`);
		}
		return await response.json();
	}
	

	async deleteUser(
		request: APIRequestContext,
		url: string,
		token: string
	) {
		const response = await request.delete(`${url}/users/delete-account`, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json',
				'x-auth-token': token
			},
			});
		if (!response.ok()) {
			throw new Error(`Delete user failed: ${response.status()} - ${response.statusText()}`);
		}
		return await response.json();
	}
}