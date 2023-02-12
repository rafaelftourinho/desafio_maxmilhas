import 'dotenv/config';
import app from './app';
import connectToDatabase from '../infrastructure/database/Connection';

const PORT = process.env.PORT || 3001;
connectToDatabase
  .getConnection()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.log('Connection with database failed:\r\n');
    console.log(err);
    console.log('\r\nServer initialization failed');
    process.exit(0);
  });
