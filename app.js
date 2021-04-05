const express = require("express"),
      mongoose = require('mongoose'),
      body_parser = require('body-parser'),
      app_config = require('./config/config.json'),
      route_init = require('./init/routeInit.js');

const app = express();

app.use(body_parser.urlencoded({limit: '60mb' ,extended: true }));
app.use(body_parser.json({limit: '60mb'}));

route_init(app, app_config.base_url);

mongoose.connect(`${app_config.db.protocol}${app_config.db.host}:${app_config.db.port}/${app_config.db.db_name}`, { useNewUrlParser: true, useUnifiedTopology: true })

app.listen(app_config.port, () => {
  console.log(`Server running ${app_config.port} port`);
});
