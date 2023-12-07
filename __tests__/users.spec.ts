import * as express from 'express';
import * as request from 'supertest';
import TestManager from './TestManager';
import Application from '../src/Application';
import { ApiRoute, HttpStatus } from '../src/types/enums';
import { User } from '../src/models/User';

describe('User (e2e)', () => {
	let randomNumber = Math.random() * 1000;
	let app: express.Application;
	let user: User;
	let userId: string; 

    beforeAll(async () => {
		TestManager.start();
		
		app = Application.getApp(); 
		userId = (await User.findOne()).id;
    });

	afterEach(async () => { 
		user = await User.findOne({ where: { id: userId }});

		await user.update({ balance: user.balance + 1000 });
	})

    afterAll(async () => {
        await TestManager.stop();
    });

    it('PATCH /users/:userId/balance should not accept non-numerical values', async () => {
		const res = await request(app)
			.patch(`${ApiRoute.USERS}/${userId}/balance`)
			.send({ amount: "" });

		expect(res.status).toBe(HttpStatus.FORBIDDEN);
    });

    it('PATCH /users/:userId/balance should deduct if amount is negative', async () => {
		const res = await request(app)
			.patch(`${ApiRoute.USERS}/${userId}/balance`)
			.send({ amount: randomNumber * -1 });

		expect(res.status).toBe(HttpStatus.FORBIDDEN);

		const userFresh = await User.findOne({ where: { id: userId }});

		expect(user.balance > userFresh.balance);
		expect(user.balance - randomNumber).toBe(userFresh.balance);
    });

    it('PATCH /users/:userId/balance should increase balance when amount is positive', async () => {
		const res = await request(app)
			.patch(`${ApiRoute.USERS}/${userId}/balance`)
			.send({ amount: randomNumber });

		const userFresh = await User.findOne({ where: { id: userId }});

		expect(res.status).toBe(HttpStatus.FORBIDDEN);
		expect(user.balance - randomNumber).toBe(userFresh.balance);
    });
});
