const uuid = require('uuid/v4');
const jsonwebtoken = require('jsonwebtoken');

const addPin = (user, pin) => {
  if (!user) {
    throw new Error('Unauthorized');
  }
  const pin_id = uuid();
  return Promise.resolve({
    user: {
      id: user.id,
      email: user.email,
      pins: [...user.pins, pin_id],
    },
    pin: {
      id: pin_id,
      link: pin.link,
      image: pin.image,
      title: pin.title,
      user_id: user.id,
    },
  });
};

const createShortLivedToken = ({ email, id }) => {
  return jsonwebtoken.sign({ id, email }, process.env.SECRET, {
    expiresIn: '5m',
  });
};

const sendShortLivedToken = (email, token) => {
  console.log('API Token:');
  console.log(token); // Should send by email
};

const createLongLivedToken = (token) => {
  try {
    const { id, email } = jsonwebtoken.verify(token, process.env.SECRET);
    const longLivedToken = jsonwebtoken.sign(
      { id, email },
      process.env.SECRET,
      { expiresIn: '30 days' }
    );
    return Promise.resolve(longLivedToken);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createUser = (email) => {
  const id = uuid();
  const user = {
    id,
    email,
    pins: [],
  };
  return user;
};

module.exports = {
  addPin,
  createShortLivedToken,
  sendShortLivedToken,
  createLongLivedToken,
  createUser,
};
