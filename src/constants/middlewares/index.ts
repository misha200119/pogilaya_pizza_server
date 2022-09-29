import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

export default [compression(), express.json(), express.urlencoded({ extended: true }), cookieParser(), cors()];
