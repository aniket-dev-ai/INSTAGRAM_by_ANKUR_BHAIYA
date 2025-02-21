import 'dotenv/config';
import app from './src/app.js';
import http from 'http';
import config from './src/config/config.js';
const server = http.createServer(app);

import { connect } from './src/config/db.js';
connect();


server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
