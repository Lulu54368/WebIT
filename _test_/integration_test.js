const request = require("supertest")
const app = require("../app")
describe("integration test before login", ()=>{
    test('testing about page', ()=>{
        return request(app)
        .get('/patient/aboutWebsite')
        .then((response)=>{
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe("text/html")
        })
    
    })
})

describe("patient integration test(after login)", ()=>{
    let agent = request.agent(app);
    let cookie = null;
    beforeAll(()=> agent
    .post('/patient/login')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send({
        email: 'pat@student.unimelb.edu.au',
        password: '123456'
    })
    .then((res)=>{
     
       
        cookie = res.headers['set-cookie'][0]
        .split(',')
        .map(item=>item.split(';')[0])
        .join(';')
    }))
    test('patient homepage', ()=>{
        return agent
        .get('/patient/6277baf627c8f0e1e203924b')
        .set('Cookie', cookie)
        .then((response)=>{
        
            expect(response.statusCode).toBe(200);
        })
    })
})