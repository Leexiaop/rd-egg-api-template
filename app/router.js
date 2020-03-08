'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.prefix('/api');

    //  直接调用的接口
    router.get('/', controller.index.index);
    router.get('/upload', controller.index.upload);

    //  广告位管理接口
    router.get('/ad/position', controller.ad.position.index)
    router.put('/ad/position', controller.ad.position.update)
    router.delete('/ad/position/:id', controller.ad.position.delete)
};
