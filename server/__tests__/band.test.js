const request = require('supertest');
const app = require('../app.js')
const {Member,Band} = require('../models')


beforeAll(async()=>{
    await  Band.destroy({
        where:{},
        truncate:true,
        restartIdentity:true,
        cascade:true
    })

    await Member.destroy({
        where:{},
        truncate:true,
        restartIdentity:true,
        cascade:true
    })
     
    await Band.create({
        name: 'BandOne',
        maxmember:1
    })
})


describe('Create Band',()=>{
    test('success create band', (done)=>{
        request(app)
        .post('/band')
        .send({
          name : "BandTwo",
          maxmember : 1
        })
        .then((resp)=>{
            const result = resp.body
            expect(resp.status).toBe(201)
            expect(result).toEqual(expect.any(Object))
            expect(result).toHaveProperty('maxmember',1)
            expect(result).toHaveProperty('name','BandTwo')
            done()
        })
        .catch((err)=>{
           done(err)
        })
    })

    test('failed create band cause unique name', (done)=>{
        request(app)
        .post('/band')
        .send({
          name : "BandTwo",
          maxmember : 1
        })
        .then((resp)=>{
            const result = resp.body
            expect(resp.status).toBe(400)
            expect(result).toEqual(expect.any(Object))
            expect(result).toHaveProperty('message','Band Name Must Be Unique')
            done()
        })
        .catch((err)=>{
           done(err)
        })
    })

    test('failed create band cause band name is empty', (done)=>{
        request(app)
        .post('/band')
        .send({
          name : "",
          maxmember : 1
        })
        .then((resp)=>{
            const result = resp.body
            expect(resp.status).toBe(400)
            expect(result).toEqual(expect.any(Object))
            expect(result).toHaveProperty('message','Band Name Cant be Empty!')
            done()
        })
        .catch((err)=>{
           done(err)
        })
    })

    test('failed create band cause band name is null', (done)=>{
        request(app)
        .post('/band')
        .send({
          maxmember : 1
        })
        .then((resp)=>{
            const result = resp.body
            expect(resp.status).toBe(400)
            expect(result).toEqual(expect.any(Object))
            expect(result).toHaveProperty('message','Band Name Cant be Empty!')
            done()
        })
        .catch((err)=>{
           done(err)
        })
    })

    test('failed create band cause max member is empty', (done)=>{
        request(app)
        .post('/band')
        .send({
          name : "BandTwo",
          maxmember : ""
        })
        .then((resp)=>{
            const result = resp.body
            expect(resp.status).toBe(400)
            expect(result).toEqual(expect.any(Object))
            expect(result).toHaveProperty('message','Band Max Members Cant be Empty!')
            done()
        })
        .catch((err)=>{
           done(err)
        })
    })

    test('failed create band cause max member is null', (done)=>{
        request(app)
        .post('/band')
        .send({
          name : "BandTwo",
        })
        .then((resp)=>{
            const result = resp.body
            expect(resp.status).toBe(400)
            expect(result).toEqual(expect.any(Object))
            expect(result).toHaveProperty('message','Band Max Members Cant be Empty!')
            done()
        })
        .catch((err)=>{
           done(err)
        })
    })
})

describe('Find All Band',()=>{
    test('success find all band', (done)=>{
        request(app)
        .get('/band')
        .then((resp)=>{
            const result = resp.body
            expect(resp.status).toBe(200)
            expect(result).toEqual(expect.any(Array))
            expect(result[0]).toEqual(expect.any(Object))
            expect(result[0]).toHaveProperty('maxmember')
            expect(result[0]).toHaveProperty('name')
            done()
        })
        .catch((err)=>{
           done(err)
        })
    })
})

describe('Add Member',()=>{
    test('success add member to band', (done)=>{
        request(app)
        .post('/band/member')
        .send({
            BandId : 1,
            name : "MemberOne",
            position : "Vocalist"
          })
        .then((resp)=>{
            const result = resp.body
            expect(resp.status).toBe(201)
            expect(result).toEqual(expect.any(Object))
            expect(result).toHaveProperty('band_id',1)
            expect(result).toHaveProperty('member_id')
            done()
        })
        .catch((err)=>{
           done(err)
        })
    })

    test('failed add member to band cause cant find band', (done)=>{
        request(app)
        .post('/band/member')
        .send({
            BandId : 3,
            name : "MemberOne",
            position : "Vocalist"
          })
        .then((resp)=>{
            const result = resp.body
            expect(resp.status).toBe(404)
            expect(result).toEqual(expect.any(Object))
            expect(result).toHaveProperty('message','Band Not Found')
            done()
        })
        .catch((err)=>{
           done(err)
        })
    })

    test('failed add member to band cause max member limit exceeded', (done)=>{
        request(app)
        .post('/band/member')
        .send({
            BandId : 1,
            name : "MemberOne",
            position : "Vocalist"
          })
        .then((resp)=>{
            const result = resp.body
            expect(resp.status).toBe(400)
            expect(result).toEqual(expect.any(Object))
            expect(result).toHaveProperty('message',"Maximum Member Limit Exceeded")
            done()
        })
        .catch((err)=>{
           done(err)
        })
    })

    test('failed add member cause member name is empty', (done)=>{
        request(app)
        .post('/band/member')
        .send({
            BandId : 2,
            name : "",
            position : "Vocalist"
          })
        .then((resp)=>{
            const result = resp.body
            expect(resp.status).toBe(400)
            expect(result).toEqual(expect.any(Object))
            expect(result).toHaveProperty('message','Member Name Cant be Empty!')
            done()
        })
        .catch((err)=>{
           done(err)
        })
    })

    test('failed add member cause member name is null', (done)=>{
        request(app)
        .post('/band/member')
        .send({
            BandId : 2,
            position : "Vocalist"
          })
        .then((resp)=>{
            const result = resp.body
            expect(resp.status).toBe(400)
            expect(result).toEqual(expect.any(Object))
            expect(result).toHaveProperty('message','Member Name Cant be Empty!')
            done()
        })
        .catch((err)=>{
           done(err)
        })
    })

    test('failed add member cause member position is empty', (done)=>{
        request(app)
        .post('/band/member')
        .send({
            BandId : 2,
            name : "MemberOne",
            position : ""
          })
        .then((resp)=>{
            const result = resp.body
            expect(resp.status).toBe(400)
            expect(result).toEqual(expect.any(Object))
            expect(result).toHaveProperty('message','Member Position Cant be Empty!')
            done()
        })
        .catch((err)=>{
           done(err)
        })
    })

    test('failed add member cause member position is empty', (done)=>{
        request(app)
        .post('/band/member')
        .send({
            BandId : 2,
            name : "MemberOne",
          })
        .then((resp)=>{
            const result = resp.body
            expect(resp.status).toBe(400)
            expect(result).toEqual(expect.any(Object))
            expect(result).toHaveProperty('message','Member Position Cant be Empty!')
            done()
        })
        .catch((err)=>{
           done(err)
        })
    })
})

describe('Find Band By Id',()=>{
    test('success find band by id', (done)=>{
        request(app)
        .get('/band/1')
        .then((resp)=>{
            const result = resp.body
            expect(resp.status).toBe(200)
            expect(result).toEqual(expect.any(Object))
            expect(result).toHaveProperty('maxmember')
            expect(result).toHaveProperty('name')
            expect(result).toHaveProperty('Members')
            done()
        })
        .catch((err)=>{
           done(err)
        })
    })

    test('failed find member by id cause cant find band', (done)=>{
        request(app)
        .get('/band/3')
        .then((resp)=>{
            const result = resp.body
            expect(resp.status).toBe(404)
            expect(result).toEqual(expect.any(Object))
            expect(result).toHaveProperty('message','Band Not Found')
            done()
        })
        .catch((err)=>{
           done(err)
        })
    })


})


