// TODO Check env type at runtime
/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const config = () => ({
  database: {
    user: process.env['DATABASE_USER'],
    password: process.env['DATABASE_PASSWORD'],
    hostname: process.env['DATABASE_HOSTNAME'],
    port: process.env['DATABASE_PORT'],
    name: process.env['DATABASE_NAME'],
  },
});

export type GatheringConfig = ReturnType<typeof config>;
