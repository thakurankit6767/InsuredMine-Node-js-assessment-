const express = require("express");
const router = express.Router();
var multer = require("multer");
const {
  Createuser,
  UserUpdate,
  UserGet,
  deleteUser,
} = require("../controller/UserController");
const {
  CreateAccount,
  AccountUpdate,
  AccountGet,
  deleteAccount,
} = require("../controller/AccountController");
const {
  CreatePolicy,
  PolicyUpdate,
  PolicyGet,
  deletePolicy,
} = require("../controller/PolicyController");
const { insertToDB } = require("../controller/upload");
const { CreateAgent } = require("../controller/AgentController");
const { CreateLOB } = require("../controller/LOBController");
const { CreateCarrier } = require("../controller/CarrierController");

router.post("/CreateAgent", CreateAgent);
router.post("/CreateLOB", CreateLOB);
router.post("/CreateCarrier", CreateCarrier);

router.post("/CreateUser", Createuser);
router.put("/UserUpdate", UserUpdate);
router.get("/UserGet/:id", UserGet);
router.delete("/DeleteUser/:id", deleteUser);

router.post("/CreateAccount", CreateAccount);
router.put("/AccountUpdate/:id", AccountUpdate);
router.get("/AccountGet/:id", AccountGet);
router.delete("/DeleteAccount/:id", deleteAccount);

router.post("/CreatePolicy", CreatePolicy);
router.put("/PolicyUpdate/:id", PolicyUpdate);
router.get("/PolicyGet/:id", PolicyGet);
router.delete("/DeletePolicy/:id", deletePolicy);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./file");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upl", upload.single("file"), insertToDB);

router.all("/*", (req, res) => {
  res.status(400).send({ status: false, message: "Invalid path params" });
});

module.exports = router;
