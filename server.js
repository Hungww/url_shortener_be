import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config'


import { setupRoutes } from './src/utils/app.util.js';

import urlMappingRouter from './src/routes/urlMapping.route.js';
import {db,Models} from './src/models/DatabaseManager.js';

const app = express();

let PORT = process.env.PORT || 3000;
app.use(cors({
    origin : 'exp://localhost:8081'
}));
//body parser
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));
app.use(bodyParser.text({ limit: '200mb' }));
//test route
app.get('/', (req, res) => {
    res.send('Backend updated 4/6');
});

const routes = [
    {
        path: '/urlMapping',
        router: urlMappingRouter
    }
];
setupRoutes(app, routes);


try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
    console.log(db.sequelize.models); 
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const newUser = Models.User.build({
    firstName: 'AAAAAAAAAAA',
    lastName: 'AAAAAAAAAAAAAAAAA',
    email: 'aaa'
    });
    await newUser.save();


//
app.listen(PORT, () => console.log('Example app is listening on port 3000.'));
