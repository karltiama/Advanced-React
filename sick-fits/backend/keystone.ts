import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';

const databaseURL =
  process.env.DATABASE_URL ||
  'mongodb://localhoost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long the should stay signed in
  secret: process.env.COOKIE_SECRET,
};

export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      // pass along cookie
      credentials: true,
    },
  },
  db: {
    // db config
    adapter: 'mongoose',
    url: databaseURL,
    // TODO: add data
  },
  lists: createSchema({
    // Schema items go in here
  }),
  ui: {
    // TODO: change this for roles
    isAccessAllowed: () => true,
  },
  // TODO: ADD session values here
});
