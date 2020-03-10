'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const md5 = require('md5');

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
        const ctx = this.ctx;
        const stream = await ctx.getFileStream();
        const filename = md5(stream.filename) + path
            .extname(stream.filename)
            .toLocaleLowerCase();
        const target = path.join(this.config.baseDir, 'app/public/uploads', filename);
        const writeStream = fs.createWriteStream(target);
        try {
            await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
            await sendToWormhole(stream);
            throw err;
        }
        ctx.body = {
            code: 0,
            message: '上传成功',
            data: {
                url: `http://cdn.project.lee.com/public/uploads/${filename}`
            }
        };
    }
}

module.exports = HomeController;
