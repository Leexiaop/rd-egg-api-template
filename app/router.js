'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.prefix('/api');

//  通用调用接口
    router.get('/', controller.index.index);
    router.get('/upload', controller.index.upload);

//  广告位接口
    //  广告位位置管理接口
    router.get('/ad/position', controller.ad.position.index)
    router.put('/ad/position', controller.ad.position.update)
    router.delete('/ad/position/:id', controller.ad.position.delete)
    //  轮播图管理
    router.get('/ad/slider', controller.ad.slider.index)
};
