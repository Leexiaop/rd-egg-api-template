'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, jwt } = app;
    router.prefix('/api');

//  通用调用接口
    router.get('/', controller.index.index);
    router.post('/login', controller.index.login)
    router.post('/upload', controller.index.upload);

//  广告位接口
    //  广告位位置管理接口
    router.get('/ad/position', jwt, controller.ad.position.index)
    router.put('/ad/position', controller.ad.position.update)
    router.delete('/ad/position/:id', controller.ad.position.delete)
    //  轮播图管理
    router.get('/ad/slider', controller.ad.slider.index)
    router.put('/ad/slider', controller.ad.slider.update)
    router.delete('/ad/slider/:id', controller.ad.slider.delete)
};
