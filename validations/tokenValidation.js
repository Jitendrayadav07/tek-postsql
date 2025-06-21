const Joi = require('joi'); 

const tokenSchema = { 
    recentTokens: Joi.object().keys({
        limit: Joi.number().integer().min(1).max(100).default(10).required(),
        offset: Joi.number().integer().min(0).default(0).required(),
    }),
}; 
module.exports = tokenSchema