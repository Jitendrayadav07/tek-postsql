const express = require("express");
const router = express.Router();

const roleController = require("../controllers/roleController");
const JoiMiddleWare = require('../middlewares/joi/joiMiddleware'); 
const roleSchema = require("../validations/roleValidation");

router.post("/create-role", 
JoiMiddleWare(roleSchema.createRole, 'body'),
roleController.createRole);

router.get("/", roleController. getRoles);


router.get("/:id", 
JoiMiddleWare(roleSchema.getRole, 'params'),
roleController. getRole);

router.put("/update",
roleController. updateRole);

router.delete("/:id", 
JoiMiddleWare(roleSchema.deleteRole, 'params'),
roleController.deleteRole);


module.exports = router;