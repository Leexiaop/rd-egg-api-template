'use strict';

const Controller = require('egg').Controller;

class PositionController extends Controller {
    async index ({app}) {
        let params = this.ctx.query
        let total = 0
        let options = {}
        if (params.limit && params.offset) {
            total = (await app.mysql.select('slider_position')).length
            options.limit = params.limit
            options.offset = params.offset - 1
        }
        const results = await app.mysql.select('slider_position', options)
        this.ctx.body = {
            code: 0,
            message: 'success',
            data: { 
                lists: results,
                total: total
            }
        }
    }
    async update ({app}) {
        let params = this.ctx.request.body
        const results = await app.mysql[params.id ? 'update' : 'insert']('slider_position', params)
        this.ctx.body = {
            code: results.affectedRows === 1 ? 0 : 101010,
            message: results.affectedRows === 1 ? 'success' : 'fail',
            data: {}
        }
    }
    async delete ({app}) {
        await app.mysql.delete('slider_position', this.ctx.params)
        this.ctx.body = {
            code: 0,
            message: 'success',
            data: {}
        }
    }
}

module.exports = PositionController;