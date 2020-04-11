const uuid = require('uuid/v4');
const jsonwebtoken = require('jsonwebtoken');

const { sendMail } = require('../email');

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

const authorize = async (database, token) => {
  const { id } = verify(token);
  const users = await database('users').select();
  return database('users').select().where({ id });
};

const createUser = (email) => {
  const id = uuid();
  return { id, email };
};

module.exports = {
  createShortLivedToken,
  sendShortLivedToken,
  createLongLivedToken,
  verify,
  authorize,
  createUser,
};
