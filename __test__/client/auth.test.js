/**
 * auth.test.js
 * @description :: contains test cases of APIs for authentication module.
 */

const dotenv = require('dotenv');
dotenv.config();
process.env.NODE_ENV = 'test';
const db = require('mongoose');
const request = require('supertest');
const { MongoClient } = require('mongodb');
const app = require('../../app');
const authConstant = require('../../constants/authConstant');
const uri = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

let insertedUser = {};

/**
 * @description : model dependencies resolver
 */
beforeAll(async function (){
  try {
    await client.connect();
    const dbInstance = client.db('EcomDb_test');

    const User = dbInstance.collection('Users');
    insertedUser = await User.insertOne({
      username: 'Noemy20',
      password: '6rUQPRbznZQJESS',
      email: 'Abdul_Anderson39@hotmail.com',
      name: 'Penny Ortiz',
      userType: 215,
      x: 463,
      y: 920,
      z: 33,
      vx: 'Awesome',
      vy: 'real-time',
      vz: 'Buckinghamshire',
      rx: 'green',
      ry: 'Hawaii',
      rz: 'Ergonomic',
      mobileNo: '(875) 711-0744',
      resetPasswordLink: {},
      loginRetryLimit: 620,
      loginReactiveTime: '2025-12-21T02:20:40.895Z',
      id: '6772da0609aaab015f2c6702'
    });
  }
  catch (error) {
    console.error(`we encountered ${error}`);
  }
  finally {
    client.close();
  }
});

// test cases

describe('POST /register -> if email and username is given', () => {
  test('should register a User', async () => {
    let registeredUser = await request(app)
      .post('/client/auth/register')
      .send({
        'username':'Flo_Gottlieb31',
        'password':'XBJqG_v6WuLQ669',
        'email':'Fermin5@hotmail.com',
        'name':'Michelle Hand PhD',
        'userType':authConstant.USER_TYPES.User,
        'x':107,
        'y':562,
        'z':959,
        'vx':'innovate',
        'vy':'optimize',
        'vz':'overriding',
        'rx':'calculate',
        'ry':'Concrete',
        'rz':'PNG',
        'mobileNo':'(732) 240-4061',
        'addedBy':insertedUser.insertedId,
        'updatedBy':insertedUser.insertedId
      });
    expect(registeredUser.statusCode).toBe(200);
    expect(registeredUser.body.status).toBe('SUCCESS');
    expect(registeredUser.body.data).toMatchObject({ id: expect.any(String) });
  });
});

describe('POST /login -> if username and password is correct', () => {
  test('should return User with authentication token', async () => {
    let User = await request(app)
      .post('/client/auth/login')
      .send(
        {
          username: 'Flo_Gottlieb31',
          password: 'XBJqG_v6WuLQ669'
        }
      );
    expect(User.statusCode).toBe(200);
    expect(User.body.status).toBe('SUCCESS');
    expect(User.body.data).toMatchObject({
      id: expect.any(String),
      token: expect.any(String)
    }); 
  });
});

describe('POST /login -> if username is incorrect', () => {
  test('should return unauthorized status and User not exists', async () => {
    let User = await request(app)
      .post('/client/auth/login')
      .send(
        {
          username: 'wrong.username',
          password: 'XBJqG_v6WuLQ669'
        }
      );

    expect(User.statusCode).toBe(400);
    expect(User.body.status).toBe('BAD_REQUEST');
  });
});

describe('POST /login -> if password is incorrect', () => {
  test('should return unauthorized status and incorrect password', async () => {
    let User = await request(app)
      .post('/client/auth/login')
      .send(
        {
          username: 'Flo_Gottlieb31',
          password: 'wrong@password'
        }
      );

    expect(User.statusCode).toBe(400);
    expect(User.body.status).toBe('BAD_REQUEST');
  });
});

describe('POST /login -> if username or password is empty string or has not passed in body', () => {
  test('should return bad request status and insufficient parameters', async () => {
    let User = await request(app)
      .post('/client/auth/login')
      .send({});

    expect(User.statusCode).toBe(400);
    expect(User.body.status).toBe('BAD_REQUEST');
  });
});

describe('POST /forgot-password -> if email has not passed from request body', () => {
  test('should return bad request status and insufficient parameters', async () => {
    let User = await request(app)
      .post('/client/auth/forgot-password')
      .send({ email: '' });

    expect(User.statusCode).toBe(400);
    expect(User.body.status).toBe('BAD_REQUEST');
  });
});

describe('POST /forgot-password -> if email passed from request body is not available in database ', () => {
  test('should return record not found status', async () => {
    let User = await request(app)
      .post('/client/auth/forgot-password')
      .send({ 'email': 'unavailable.email@hotmail.com', });

    expect(User.statusCode).toBe(404);
    expect(User.body.status).toBe('RECORD_NOT_FOUND');
  });
});

describe('POST /forgot-password -> if email passed from request body is valid and OTP sent successfully', () => {
  test('should return success message', async () => {
    let User = await request(app)
      .post('/client/auth/forgot-password')
      .send({ 'email':'Fermin5@hotmail.com', });

    expect(User.statusCode).toBe(200);
    expect(User.body.status).toBe('SUCCESS');
  });
});

describe('POST /validate-otp -> OTP is sent in request body and OTP is correct', () => {
  test('should return success', () => {
    return request(app)
      .post('/client/auth/login')
      .send(
        {
          username: 'Flo_Gottlieb31',
          password: 'XBJqG_v6WuLQ669'
        }).then(login => () => {
        return request(app)
          .get(`/client/api/v1/User/${login.body.data.id}`)
          .set({
            Accept: 'application/json',
            Authorization: `Bearer ${login.body.data.token}`
          }).then(foundUser => {
            return request(app)
              .post('/client/auth/validate-otp')
              .send({ 'otp': foundUser.body.data.resetPasswordLink.code, }).then(User => {
                expect(User.statusCode).toBe(200);
                expect(User.body.status).toBe('SUCCESS');
              });
          });
      });
  });
});

describe('POST /validate-otp -> if OTP is incorrect or OTP has expired', () => {
  test('should return invalid OTP', async () => {
    let User = await request(app)
      .post('/client/auth/validate-otp')
      .send({ 'otp': '12334' });
    
    expect(User.statusCode).toBe(200);
    expect(User.body.status).toBe('FAILURE');
    
  });
});

describe('POST /validate-otp -> if request body is empty or OTP has not been sent in body', () => {
  test('should return insufficient parameter', async () => {
    let User = await request(app)
      .post('/client/auth/validate-otp')
      .send({});

    expect(User.statusCode).toBe(400);
    expect(User.body.status).toBe('BAD_REQUEST');
  });
});

describe('PUT /reset-password -> code is sent in request body and code is correct', () => {
  test('should return success', () => {
    return request(app)
      .post('/client/auth/login')
      .send(
        {
          username: 'Flo_Gottlieb31',
          password: 'XBJqG_v6WuLQ669'
        }).then(login => () => {
        return request(app)
          .get(`/client/api/v1/User/${login.body.data.id}`)
          .set({
            Accept: 'application/json',
            Authorization: `Bearer ${login.body.data.token}`
          }).then(foundUser => {
            return request(app)
              .put('/client/auth/validate-otp')
              .send({
                'code': foundUser.body.data.resetPasswordLink.code,
                'newPassword':'newPassword'
              }).then(User => {
                expect(User.statusCode).toBe(200);
                expect(User.body.status).toBe('SUCCESS');
              });
          });
      });
  });
});

describe('PUT /reset-password -> if request body is empty or code/newPassword is not given', () => {
  test('should return insufficient parameter', async () => {
    let User = await request(app)
      .put('/client/auth/reset-password')
      .send({});
    
    expect(User.statusCode).toBe(400);
    expect(User.body.status).toBe('BAD_REQUEST');
  });
});

describe('PUT /reset-password -> if code is invalid', () => {
  test('should return invalid code', async () => {
    let User = await request(app)
      .put('/client/auth/reset-password')
      .send({
        'code': '123',
        'newPassword': 'testPassword'
      });

    expect(User.statusCode).toBe(200);
    expect(User.body.status).toBe('FAILURE');

  });
});

afterAll(function (done) {
  db.connection.db.dropDatabase(function () {
    db.connection.close(function () {
      done();
    });
  });
});
