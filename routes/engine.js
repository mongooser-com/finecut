'use strict';

const path = require('path');

const ioc = require('../mods/ioc');
const app = ioc.get('app');
const express = ioc.get('express');

const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '5mb'}));

// root folder of user's content
app.use('/', express.static('content'));

// admin panel, please use NGINX .htpasswd
// to close it from undesirable sight
app.use('/engine', express.static('engine'));

app.use('/engine/template_action', require('./engine/template_action'));
