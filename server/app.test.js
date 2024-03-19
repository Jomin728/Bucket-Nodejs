const { response } = require('express');
const request = require('supertest');
const app = require('./index').app;

describe('REST API for bucket',()=>{
    it('get userinfo',()=>{
        return request(app)
        .get('api/userSearch?email=jominrajesh@gmail.com')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        _id: expect.any(String),
                        email: expect.any(String),
                        username: expect.any(String),
                        _v: expect.any(Number)
                    })
                ])
            )
        })
    })
        it('user login',()=>{
        return request(app)
        .post('/api/login')
        .send({
            password: 'qwerty',
            username: 'jominrajesh@gmail.com'
        })
        .expect(302)
    })
})
