'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.prefix('/api');

    router.get('/', controller.index.index);
    router.get('/upload', controller.home.upload);


};
