const users = [
  { id: '1', email: 'name@example.com' },
  { id: '2', email: 'other@example.com' },
  { id: '3', email: 'third@example.com' },
];

const pins = [
  {
    id: '1',
    title: 'First',
    link: 'http://example.com',
    image: 'http://example.com',
    user_id: '1',
  },
  {
    id: '2',
    title: 'Second',
    link: 'http://example.com',
    image: 'http://example.com',
    user_id: '2',
  },
  {
    id: '3',
    title: 'Third',
    link: 'http://example.com',
    image: 'http://example.com',
    user_id: '2',
  },
];

exports.seed = (knex) =>
  knex('users')
    .del()
    .then(() => knex('pins').del())
    .then(() => knex('users').insert(users))
    .then(() => knex('pins').insert(pins));
