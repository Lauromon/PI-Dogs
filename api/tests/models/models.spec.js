const { Breed, Temperament, conn } = require('../../src/db.js');

describe('Test Models', () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
  });

  describe('Breed ', () => {
    it('should not create the Breed if name is not send', async () => {
      expect.assertions(1);
      try {
        await Breed.create({
          Image: "url",
          life_span: "string",
          weight: "string",
          height: "string",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it('should not create the Breed if life span is not send', async () => {
      expect.assertions(1);
      try {
        await Breed.create({
          Image: "string",
          name: "string",
          weight: "string",
          height: "string",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it('should not create the Breed if weight is not send', async () => {
      expect.assertions(1);
      try {
        await Breed.create({
          Image: "url",
          life_span: "string",
          name: "qwerty",
          height: "string",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it('should not create the Breed if height is not send', async () => {
      expect.assertions(1);
      try {
        await Breed.create({
          Image: "url",
          life_span: "string",
          weight: "string",
          name: "asdf",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it('should create the Breed if all required properties are ok', async () => {
      const breed = await Breed.create({
        name: "name",
        life_span: "string",
        weight: "string",
        height: "string",
      });
      expect(breed.toJSON()).toHaveProperty('name', 'name');
      expect(breed.toJSON()).toHaveProperty('life_span', "string");
      expect(breed.toJSON()).toHaveProperty('weight', "string");
      expect(breed.toJSON()).toHaveProperty('height', "string");
    });

    it('should not create two Breeds with the same name', async () => {
      expect.assertions(5);
      try {
        const breedOne = await Breed.create({
          name: "dog",
          life_span: "string",
          weight: "string",
          height: "string",
        });
        expect(breedOne.toJSON()).toHaveProperty('name', 'dog');
        expect(breedOne.toJSON()).toHaveProperty('life_span', "string");
        expect(breedOne.toJSON()).toHaveProperty('weight', "string");
        expect(breedOne.toJSON()).toHaveProperty('height', "string");
        await Breed.create({
          name: "dog",
          life_span: "lalala",
          weight: "lalala",
          height: "lalala",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  })

  describe('Temperament ', () => {
    it('should not create the Temperament if name is not send', async () => {
      expect.assertions(1);
      try {
        await Temperament.create({});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it('should create the Temperament if all required properties are ok', async () => {
      const temp = await Temperament.create({
        name: 'Happy'});
      expect(temp.toJSON()).toHaveProperty('name', 'Happy');
  
    });

    it('should not create two Temperaments with the same name-mana combination', async () => {
      expect.assertions(2);
      try {
        const temperament = await Temperament.create({ name: 'Clowny'});
        expect(temperament.toJSON()).toHaveProperty('name','Clowny');
        await Temperament.create({ name: 'Clowny'});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  })
})