import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Poster from "../assets/3.png";
import "../styles/add-job.css";
import toast from "react-hot-toast";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducer/userSlice";
import { updatejobAPI } from "../api/users";
import { listJob } from "../reducer/jobSlice";

const EditJob = () => {
  const companyRef = useRef(null);
  const logoUrlRef = useRef(null);
  const jobPositionRef = useRef(null);
  const monthlySalaryRef = useRef(null);
  const jobTypeRef = useRef(null);
  const remoteOrOfficeRef = useRef(null);
  const locationRef = useRef(null);
  const jobDescriptionRef = useRef(null);
  const aboutCompanyRef = useRef(null);
  const skillsRequiredRef = useRef(null);
  const additionalInfoRef = useRef(null);
  const noOfEmployee = useRef(null);

  const navigate = useNavigate();
  let user = useSelector((state) => state.user.userDetails);
  let token = useSelector((state) => state.user.token);
  let job = useSelector((state) => state.jobs.jobLists);
  const { jobId } = useParams();
  // console.log(job);

  // Fix for the `Uncaught TypeError: job.filter is not a function` error
  const jobs = Array.from(job).filter((job) => job._id == jobId);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Access values from the refs
    const companyName = companyRef.current.value;
    const logoUrl = logoUrlRef.current.value;
    const jobPosition = jobPositionRef.current.value;
    const salary = monthlySalaryRef.current.value;
    const jobType = jobTypeRef.current.value;
    const workFrom = remoteOrOfficeRef.current.value;
    const location = locationRef.current.value;
    const jobDescription = jobDescriptionRef.current.value;
    const aboutCompany = aboutCompanyRef.current.value;
    const skills = skillsRequiredRef.current.value.split(",");
    const information = additionalInfoRef.current.value;
    const no_of_employees = noOfEmployee.current.value;

    updatejobAPI(
      companyName,
      logoUrl,
      jobPosition,
      salary,
      jobType,
      workFrom,
      location,
      jobDescription,
      aboutCompany,
      skills,
      information,
      no_of_employees,
      user.id,
      token,
      jobId
    )
      .then((response) => {
        toast.success(response.data.message);
        // dispatch(listJob(response.data.job));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);

        if (err.response.status === 401 || err.response.status === 500) {
          dispatch(logout());
          navigate("/login");
        }
      });
  };

  return (
    <div className="add-job-container">
      <div className="job-form">
        <h1 className="heading">Edit Job Description</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="">Company Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your company name here"
              ref={companyRef}
              className="job-input-box rounded border"
              defaultValue={jobs[0]?.companyName}
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Add logo URL</label>
            <input
              type="text"
              name="name"
              placeholder="Enter the link"
              ref={logoUrlRef}
              className="job-input-box rounded border"
              defaultValue={jobs[0]?.logoUrl}
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Job position</label>
            <input
              type="text"
              name="name"
              placeholder="Enter job position"
              ref={jobPositionRef}
              className="job-input-box rounded border"
              defaultValue={jobs[0]?.jobPosition}
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Monthly salary</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Amount in rupees"
              ref={monthlySalaryRef}
              className="job-input-box rounded border"
              defaultValue={jobs[0]?.salary}
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Job Type</label>
            <select
              name=""
              id=""
              ref={jobTypeRef}
              className="job-select-box rounded border"
              defaultValue={jobs[0]?.jobType}
            >
              <option defaultValue="Full-time">Full-time</option>
              <option defaultValue="Part-time">Part-time</option>
              <option defaultValue="Contract">Contract</option>
              <option defaultValue="Freelance">Freelance</option>
              <option defaultValue="Internship">Internship</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="">Remote/office</label>
            <select
              name=""
              id=""
              ref={remoteOrOfficeRef}
              className="job-select-box rounded border"
              defaultValue={jobs[0]?.workFrom}
            >
              <option defaultValue="Office">Office</option>
              <option defaultValue="Home">Home</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="">No. of Employees</label>
            <select
              name=""
              id=""
              ref={noOfEmployee}
              className="job-select-box rounded border"
              defaultValue={jobs[0]?.no_of_employees}
            >
              <option defaultValue="0-10">0-10</option>
              <option defaultValue="11-50">11-50</option>
              <option defaultValue="51-100">51-100</option>
              <option defaultValue="111-500">111-500</option>
              <option defaultValue="501-1000">501-1000</option>
              <option defaultValue="1000+">1000+</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="">Location</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Location"
              ref={locationRef}
              className="job-input-box rounded border"
              defaultValue={jobs[0]?.location}
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Job Description</label>
            <textarea
              name=""
              className="job-text-box rounded border"
              placeholder="Type the job description"
              cols="40"
              rows="10"
              ref={jobDescriptionRef}
              defaultValue={jobs[0]?.jobDescription}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="">About Company</label>
            <textarea
              name=""
              className="job-text-box rounded border"
              placeholder="Type about your company"
              cols="40"
              rows="10"
              ref={aboutCompanyRef}
              defaultValue={jobs[0]?.aboutCompany}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="">Skills Required</label>
            <input
              type="text"
              name="name"
              placeholder="C++, Java, Python"
              ref={skillsRequiredRef}
              className="job-input-box rounded border"
              defaultValue={jobs[0]?.skills}
            />
          </div>

          <div className="form-group ">
            <label htmlFor="">Information</label>
            <input
              type="text"
              name="name"
              placeholder="Enter the additional information"
              ref={additionalInfoRef}
              className="job-input-box rounded border"
              defaultValue={jobs[0]?.information}
            />
          </div>

          <div className="button-container">
            <button
              className="add-button rounded"
              type="submit"
              onClick={handleSubmit}
            >
              <AiOutlinePlus className="text-white" />
              Update Job
            </button>
            <button
              type="button"
              className="button-cancel rounded"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div className="poster">
        <label className="poster-label">Recruiter add job details here</label>
        <img src={Poster} alt="" className="poster-image" />
      </div>
    </div>
  );
};

export default EditJob;
