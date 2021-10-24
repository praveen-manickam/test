const { verifyToken } = require("../auth/helper");
const {
  login,
  signUp,
  uploadProfilePic,
  getUser,
} = require("../controllers/users");
var multer = require("multer");
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
const router = require("express").Router();

router.post("/register", signUp);
router.post("/login", login);
router.post(
  "/profile-pic",
  verifyToken,
  upload.single("profile-picture"),
  uploadProfilePic
);
router.get("/", verifyToken, getUser);

module.exports = router;
