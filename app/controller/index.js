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
    async login ({app}) {
        console.log(this.ctx.user)
        const res = await app.mysql.get('users', {username: this.ctx.request.body.username, password: this.ctx.request.body.password})
        if (!res) throw new Error('No authorization token was')
        this.ctx.body = {
            code: 0,
            message: res ? '登录成功' : '请重新登录',
            data: {
                token: app.jwt.sign({
                    username: this.ctx.request.body.username,
                    password: this.ctx.request.body.password
                }, app.config.jwt.secret),
                userInfo: {
                    id: res.id,
                    username: res.username,
                    name: res.name,
                    authority: res.authority,
                    avatar: res.avatar
                }
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
