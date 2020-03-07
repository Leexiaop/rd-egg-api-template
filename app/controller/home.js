'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = 'hi, egg';
    }
    async upload () {
        const { ctx } = this;
        ctx.body = '这里是上传接口低调点'
    }
}

module.exports = HomeController;
