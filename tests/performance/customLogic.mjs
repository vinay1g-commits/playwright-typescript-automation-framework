//javascript logic used inside artillery-test2.yml
let users;

export default {
  async beforeRequest(req, ctx, ee, next) {
    if (!users) {
      // Use dynamic import with assert (this works fine in runtime)
      const data = await import('./users.json', {
        assert: { type: 'json' }
      });
      users = data.default;
    }

    const randomUser = users[Math.floor(Math.random() * users.length)];
    ctx.vars.username = randomUser.username;
    ctx.vars.password = randomUser.password;
    return next();
  },
};
