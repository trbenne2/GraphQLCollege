const uuid = require('uuid/v4');
const jsonwebtoken = require('jsonwebtoken');

const database = require('./database');
const sendMail = require('./email');

const addPin = (user, pin) => {
  if (!user) {
    throw new Error('Unauthorized');
  }
  const pin_id = uuid();
  return Promise.resolve({
    user: {
      id: user.id,
      email: user.email,
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
  return sendMail({
    from: '"Julian" <julian@graphql.college>',
    to: email,
    text: `${process.env.APP_URL}/verify?token=${token}`,
    html: `<a href="${process.env.APP_URL}/verify?token=${token}" target="_blank">Authenticate</a>`,
    subject: 'Auth token',
  });
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

const verify = (token) => {
  try {
    return jsonwebtoken.verify(token, process.env.SECRET);
  } catch (error) {
    throw new Error('Unauthorized');
  }
};

const authorize = async (token) => {
  const { id } = verify(token);
  const users = await database('users').select();
  return database('users').select().where({ id });
};

const createUser = (email) => {
  const id = uuid();
  return { id, email };
};

module.exports = {
  addPin,
  createShortLivedToken,
  sendShortLivedToken,
  createLongLivedToken,
  verify,
  authorize,
  createUser,
};
