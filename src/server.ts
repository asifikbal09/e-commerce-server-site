import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

// let server: Server;

async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string);

    app.listen(config.port, () =>
      console.log(`Example app listening on port ${config.port}!`),
    );
  } catch (err) {
    console.log(err);
  }
}

main();

// process.on('unhandledRejection', () => {
//   console.log(`Unhandled Rejection denoted. server is shuting down...`);
//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }
//   process.exit(1);
// });

// process.on('uncaughtException', () => {
//   process.exit(1);
// });
