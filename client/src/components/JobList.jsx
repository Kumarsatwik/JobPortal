import { BsFillPeopleFill } from "react-icons/bs";
import { BiRupee } from "react-icons/bi";
import India from "../assets/india.png";
import "../styles/job-list.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";

const JobList = ({ data, loggedIn, user_id }) => {
  const navigate = useNavigate();
  return (
    <section className="job-list-container">
      <div className="flex gap-2">
        <img src={data.logoUrl} className="job-list-logo" alt="" />
        <div className="job-list-details">
          <p>{data?.jobPosition}</p>
          <div className="job-list-icons">
            <span className="people_list">
              <BsFillPeopleFill />
              <label htmlFor="">{data?.no_of_employees}</label>
            </span>
            <span className="ruppes_list">
              <BiRupee />
              <label htmlFor="">{data?.salary}</label>
            </span>
            <span className="country_icon">
              <img src={India} alt="" />
              <label htmlFor="">{data?.location}</label>
            </span>
          </div>
          <span className="job-status">
            <label className="">{data?.workFrom}</label>
            <label className="">{data?.jobType}</label>
          </span>
        </div>
      </div>

      <div className="job-details">
        <div className="job-category-list">
          {data?.skills.map((skill) => (
            <span key={skill} className="job-category">
              {skill}
            </span>
          ))}
        </div>
        <div className="job-actions">
          {loggedIn && user_id == data.employer && (
            <button className="edit-button" onClick={() => navigate(`/edit-job/${data._id}`)}>Edit Job</button>
          )}
          <button
            className="view-details-button"
            onClick={() => navigate(`/about-job/${data._id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </section>
  );
};

export default JobList;
