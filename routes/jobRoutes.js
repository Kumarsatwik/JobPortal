const verifyToken = require("../middleware/verifyToken");

const express = require("express");
const router = express.Router();

const {
  createJob,
  getAllJob,
  getJobById,
  updateJob,
  searchJob,
  filterSkill,
  getSkill,
  getAllSkills,
} = require("../controllers/jobController");

router.post("/job-post", verifyToken, createJob);
router.put("/job-post/:id", verifyToken, updateJob);
router.get("/all-job", getAllJob);
router.post("/get-skill", getSkill);
router.get("/get-all-skill", getAllSkills);
router.post("/search-job", searchJob);
router.get("/filter", verifyToken, filterSkill);
router.get("/jobpost/:id", verifyToken, getJobById);

module.exports = router;
