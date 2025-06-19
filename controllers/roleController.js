const Response = require("../classes/Response");
const db = require("../config/db");

const createRole = async (req, res) => {
    try{
        let { role_name } = req.body
        let roleName = await db.role.findOne({where: {role_name: role_name}});
        if (roleName) {
            return res.status(400).send(Response.sendResponse(false, null, "Not FOund", 400));
        }
        let role = await db.role.create({role_name : role_name});

        return res.status(201).send(Response.sendResponse(true,role,null,201));
    }catch(err) {
        console.log("err", err);
        return res.status(500).send(Response.sendResponse(false,null,null,500));
    }
}

const getRoles = async (req, res) => {
    try {
        let role = await db.role.findAll();
        return res.status(200).send(Response.sendResponse(true,role,null,200));
    }catch(err){
        return res.status(500).send(Response.sendResponse(false,null,null,500));
    }
}

const getRole = async (req, res) => {
    try {
        let role = await db.role.findOne({where: {id: req.params.id}});
        return res.status(200).send(Response.sendResponse(true,role,null,200));
    }catch(err){
        return res.status(500).send(Response.sendResponse(false,null,ROLE_CONSTANTS_STATUS.ERROR_OCCURED,500));
    }
}

const updateRole = async (req, res) => {
    try{
        let role = await db.role.update(req.body, {where: {id : req.body.id}})
        await userActivityLogger.logTagtalkActivity(req , req.user.id, ROLE_CONSTANTS_STATUS.ROLE_UPDATED);
        return res.status(200).send(Response.sendResponse(true,role,ROLE_CONSTANTS_STATUS.ROLE_UPDATED,200));
    }catch(err) {
        return res.status(500).send(Response.sendResponse(false,null,ROLE_CONSTANTS_STATUS.ERROR_OCCURED,500));
    }
}

const deleteRole = async (req, res) => {
    try{
        let role = await db.role.destroy({where: {id : req.params.id}})
        return res.status(200).send(Response.sendResponse(true,role,ROLE_CONSTANTS_STATUS.ROLE_DELETED,200));
    }catch(err) {
        return res.status(500).send(Response.sendResponse(false,null,ROLE_CONSTANTS_STATUS.ERROR_OCCURED,500));
    }
}


module.exports = { 
    createRole, 
    getRoles, 
    getRole, 
    updateRole, 
    deleteRole
}


