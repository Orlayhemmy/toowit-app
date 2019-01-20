import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

import routes from './route';

const app = express();
const compiler = webpack(webpackConfig);

  app.use(webpackMiddleware(compiler, {
    hot: true,
    publicpath: webpackConfig.output.publicPath,
    stats: { colors: true },
    noInfo: true
  }));
  app.use(webpackHotMiddleware(compiler));

const staticMiddleware = express.static("client");

app.use(staticMiddleware);

// Set up mongoose connection
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  '/api/v1/',
  (req, res, next) => {
    let err = null;
    try {
      decodeURIComponent(req.path);
    } catch (e) {
      err = e;
    }
    if (err) {
      return res.status(404).send({ error: 'page not found' });
    }
    next();
  },
  routes
);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log(`App started on port ${app.get('port')}`);
});

export default app;
