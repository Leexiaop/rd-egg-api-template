/* eslint valid-jsdoc: "off" */

'use strict';
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  config.cluster = {
    listen: {
      path: '',
      port: 5204,
      hostname: '0.0.0.0',
    }
  };
  config.jwt = {
    secret: "123456"//自定义 token 的加密条件字符串
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['http://project_platform.lee.com'],//允许访问接口的白名单
  };
  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'lee13691388204',
      // database
      database: 'lee',    
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1583512367261_5872';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
