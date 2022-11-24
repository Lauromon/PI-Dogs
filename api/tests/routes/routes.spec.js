/* eslint-disable import/no-extraneous-dependencies */
/* const { expect } = require('chai'); */
const request = require('supertest');
const app = require('../../src/app.js');
const { Breed, Temperament, conn } = require('../../src/db.js');

describe('Test routes', () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
  })

  describe('Breeds', () => {
    it('GET/dogs should get 200', async () =>
      await request(app).get('/dogs').expect(200)
    );

    it('GET/dogs?name= should list all breeds that match with the name', async () => {
      const res = await request(app).get('/dogs?name=pug');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([
        expect.objectContaining({
          id: 201,
          image: "https://cdn2.thedogapi.com/images/HyJvcl9N7.jpg",
          name: "Pug",
          temperament: "Docile, Clever, Charming, Stubborn, Sociable, Playful, Quiet, Attentive",
          weight: "6 - 8"
        })
      ])
    });

    it('GET/dogs?name= should return status 404 and the correct message if breed name is not found', async () => {
      const res = await request(app).get('/dogs?name=aadsfdgf');
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual(
        { msg: "Breed not found :(" }
      )
    });

    it('GET/dogs/:id should return the breed details that match with the id', async () => {
      const res = await request(app).get('/dogs/16');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(
        {
          id: 16,
          name: "American Staffordshire Terrier",
          temperament: "Tenacious, Friendly, Devoted, Loyal, Attentive, Courageous",
          weight: "23 - 27",
          height: "43 - 48",
          image: "https://cdn2.thedogapi.com/images/rJIakgc4m.jpg",
          life_span: "12 - 15 years"
        }
      )
    });

    it('GET/dogs/:id should return status 404 if breed id is not found', async () => {
      const res = await request(app).get('/dogs?name=aadsfdgf');
      expect(res.statusCode).toBe(404);
    });

    it('POST/dogs should return status 404 and corresponding text if any of the mandatory parameters is not send', async () => {
      const res = await request(app)
        .post('/dogs')
        .send({
          name: "Ricardio",
          life_span: "123",
          weight: "123",
          height: null,
          temperament: []
        });
      expect(res.statusCode).toBe(404);
      expect(res.text).toBe('Name, weight, height and life span required');
    });

    it('POST/dogs should return status 201 and corresponding text if the character was succesfully created', async () => {
      const res = await request(app)
        .post('/dogs')
        .send({
          name: "Ricardio",
          life_span: "123",
          weight: "123",
          height: "23123",
          temperament: []
        });
      expect(res.statusCode).toBe(201);
      expect(res.text).toBe('Breed created!');
    });

    it('PUT/dogs/:id should add changes to the breed, return status 201 and corresponding text', async () => {
      const breed = await Breed.findOne({
        where: { name: "Ricardio" }
      })

      const res = await request(app)
        .put(`/dogs/${breed.id}`)
        .send({
          life_span: "changed",
          height: "changed"
        });
      const results = await Breed.findOne({
        where: { name: "Ricardio" }
      });
      expect(res.statusCode).toBe(201);
      expect(res.text).toBe('Breed updated!');
      expect(results.life_span).toEqual("changed")
      expect(results.height).toEqual("changed")
    })

    it('DELETE/dogs/:id should delete the breed, return status 200 and corresponding text', async () => {
      const breed = await Breed.findOne({
        where: { name: "Ricardio" }
      })

      const res = await request(app)
        .delete(`/dogs/${breed.id}`)
      const results = await Breed.findOne({
        where: { name: "Ricardio" }
      });
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe('The breed went to the park');
      expect(results).toBeNull()
    })
  });

  describe('Temperaments', () => {
    it('GET/temperaments should get 200', async () =>
      await request(app).get('/temperaments').expect(200)
    );
  });

});
