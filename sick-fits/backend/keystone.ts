import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/Users';
import 'dotenv/config';

const databaseURL =
  process.env.DATABASE_URL ||
  'mongodb://localhoost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long the should stay signed in
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: ADD in inital roles here
  },
});

export default withAuth(
  config({
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
      // if property name and name of
      // variable you are setting it too
      // then you can just do this other
      // wise User: User works too
      User,
    }),
    ui: {
      // TODO: change this for roles
      // Show UI only for people who pass this test
      isAccessAllowed: ({ session }) =>
        // console.log(session);
        !!session?.data,
    },
    // TODO: ADD session values here
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL Query
      User: 'id name email',
    }),
  })
);
