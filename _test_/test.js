const request = require("supertest")
const app = require("../app")
describe("integration test: get about page", ()=>{
    
    return  request(app)
    .get('/patient/aboutWebsite')
    .then((response)=>{
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe("text/html")
    })

})