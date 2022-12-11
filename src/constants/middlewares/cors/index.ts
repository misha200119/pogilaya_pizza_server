import cors from 'cors';
import { CLIENT_URL, CLIENT_PORT, isProd, CORSAllowedURLs } from '@/env';

const allowedURLs = [isProd ? CLIENT_URL : `${CLIENT_URL}:${CLIENT_PORT}`, ...CORSAllowedURLs];

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;

  if (allowedURLs.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { credentials: true, origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { credentials: true, origin: true }; // disable CORS for this request
  }
  callback(null, corsOptions);
};

export default cors(corsOptionsDelegate);
