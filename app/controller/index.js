'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = {
            code: 0,
            message: '请求成功',
            data: {
                content: '欢迎使用本教程，我的后端技术栈是egg.js!'
            }
        }
    }
    async upload () {
        const { ctx } = this;
        ctx.body = '这里是上传接口低调点'
    }
}

module.exports = HomeController;
