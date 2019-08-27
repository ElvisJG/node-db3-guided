const db = require('../data/db-config.js');

module.exports = {
  find,
  findById,
  findPosts,
  add,
  update,
  remove
};

function find() {
  return db('users');
}

// A single user or NULL
function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function findPosts(user_id) {
  // SELECT id, contents, username FROM posts as p
  // JOIN users as u on p.user_id = u.id;
  return db('posts as p')
    .join('users as u', 'u.id', 'p.user_id')
    .select('p.id', 'p.contents', 'u.username')
    .where({ user_id });
}

// resolves to a newly created user
function add() {
  return db('users')
    .insert(userData)
    .then(ids => {
      return findById(ids[0]);
    });
}

// resolves to updated user
function update(changes, id) {
  return db('users')
    .where({ id })
    .update(changes)
    .then(count => {
      return findById(id);
    });
}

// resolves to a count
function remove(id) {
  return db('users')
    .where({ id })
    .del();
}
