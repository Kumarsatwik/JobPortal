import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import "../styles/job-description.css";
import { useSelector } from "react-redux";
import { BsCash, BsCalendarFill } from "react-icons/bs";
const JobDescription = () => {
  const { jobId } = useParams();
  let job = useSelector((state) => state.jobs.jobLists);
  let data = Array.from(job).filter((job) => job._id == jobId);
  data = data[0];
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userDetails);
  console.log(user._id);
  return (
    <>
      {/* Header */}
      <Header />

      {/* Job Description */}

      <div>
        <div className="containner">
          <div className="containnerInnerDiv">
            <p>
              {data.jobPosition} {data.jobType} Job at{" "}
              {data.companyName}
            </p>
          </div>
          <div className="jobDetailsDiv">
            <div className="commonDiv">
              <p>1w Ago</p>
              <p>{data.jobType}</p>
            </div>
            <div>
              <div className="commonDiv">
                <p>{data.jobPosition}</p>

                {user.id == data.employer && (
                  <button onClick={() => navigate("/edit-job/" + jobId)}>
                    Edit Job
                  </button>
                )}
              </div>
              <p>{data.location} | India</p>
            </div>

            <div className="flex about-job-details">
              <div>
                <span className="flex items-center">
                  <BsCash size={25} />
                  <p>Stipend</p>
                </span>
                <p>Rs {data.salary}/Month</p>
              </div>

              {data.jobPosition == "Contract" ? (
                <>
                  <div>
                    <span className="flex items-center">
                      <BsCalendarFill />
                      <p> Duration</p>
                    </span>
                    <p>{data.jobDuration}</p>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="my-5">
              <p>About Comapny</p>
              <p>{data.aboutCompany}</p>
            </div>

            <div className="my-5">
              <p>About the job/internship</p>
              <p>{data.jobDescription}</p>
            </div>

            <div className="my-5">
              <div className="my-5">
                <p>Skill(s) required</p>
              </div>
              <div className="commonDiv">
                {data.skills.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>

            <div className="my-5">
              <p>Additional Information</p>
              <p>
                {data.information}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
