const Job = require("../model/Job");

// Create Job
const createJob = async (req, res, next) => {
  const {
    companyName,
    logoUrl,
    jobPosition,
    jobDescription,
    aboutCompany,
    salary,
    location,
    jobType,
    workFrom,
    skills,
    information,
    no_of_employees,
    employer,
  } = req.body;
  if (
    !companyName ||
    !logoUrl ||
    !jobPosition ||
    !jobDescription ||
    !aboutCompany ||
    !salary ||
    !location ||
    !jobType ||
    !workFrom ||
    !skills ||
    !information ||
    !no_of_employees
  ) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  try {
    const job = await Job.create(req.body);

    return res.status(201).json({ message: "Job created" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// get all Job
const getAllJob = async (req, res, next) => {
  try {
    const job = await Job.find();
    // console.log(job);
    res.status(200).json(job);
  } catch (err) {
    next(err);
  }
};

// get all skills
const getAllSkills = async (req, res, next) => {
  Job.distinct("skills")
    .then((skills) => {
      const distinctSkills = [...new Set(skills)];
      res.status(200).json(distinctSkills);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

// particular Skills Data
const getSkill = async (req, res, next) => {
  const { skills } = req.body;
  // console.log(skills);
  try {
    const job = await Job.find({ skills: { $in: skills } });
    console.log(job);
    res.status(200).json(job);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

// Get Job by id
const getJobById = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    res.status(200).json(job);
  } catch (err) {
    next(err);
  }
};

// Job Update
const updateJob = async (req, res, next) => {
  // console.log(req.body);
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(job);
    res.status(200).json({ job, message: "Job updated" });
  } catch (err) {
    next(err);
  }
};

// Search Job

const searchJob = async (req, res, next) => {
  try {
    const jobPost = await Job.find({
      jobPosition: new RegExp(req.body.search, "i"),
    });

    res.status(200).json(jobPost);
  } catch (err) {
    next(err);
  }
};

// filter skills

const filterSkill = async (req, res, next) => {
  try {
    let { skills } = req.query;
    skills = skills.trim();
    const skillsArray = skills.split(",");
    console.log(skillsArray);
    const filteredJob = await Job.find({ Skill: { $in: skillsArray } });
    res.json(filteredJob);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createJob,
  getAllJob,
  getJobById,
  updateJob,
  searchJob,
  filterSkill,
  getSkill,
  getAllSkills,
};
