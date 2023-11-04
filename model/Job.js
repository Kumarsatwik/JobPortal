const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
  jobPosition: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  jobDuration: {
    type: String,
  },
  aboutCompany: {
    type: String,
    required: true,
  },
  no_of_employees: {
    type: String,
    enum: ["0-10", "11-50", "51-100", "111-500", "501-1000", "1000+"],
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Freelance", "Internship"],
    required: true,
  },
  workFrom: {
    type: String,
    enum: ["Home", "Office"],
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  information: {
    type: String,
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
