module.exports = function () {
  const faker = require("faker/locale/ru");
  const _ = require("lodash");
  return {
    people: _.times(100, function (n) {
      return {
        imgUrl: faker.image.imageUrl(),
        lastName: faker.name.lastName(),
        firstName: faker.name.firstName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
      };
    }),
  };
};
