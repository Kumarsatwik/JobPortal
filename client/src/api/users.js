import axios from "axios";

const baseURL = "http://localhost:4000";
export const signupAPI = async (email, password, phone, name) => {
  //   console.log(name, email, phone, password);
  try {
    const { data } = await axios.post(`${baseURL}/api/auth/register`, {
      name,
      email,
      password,
      phone,
    });
    return data;
  } catch (e) {
    if (e.response && e.response.data.message) {
      throw new Error(e.response.data.message);
    }
    console.log(e);
    throw new Error(e.message);
  }
};

export const loginAPI = async (email, password) => {
  console.log(email, password);
  try {
    const { data } = await axios.post(`${baseURL}/api/auth/login`, {
      email,
      password,
    });
    return data;
  } catch (e) {
    // console.log(e);
    if (e.response && e.response.data.message) {
      throw new Error(e.response.data.message);
    }
    // console.log(e);
    throw new Error(e.message);
  }
};

export const addjobAPI = async (
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
  user,
  token
) => {
  try {
    const data = axios.post(
      `${baseURL}/api/job/job-post`,
      {
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
        employer: user,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    return data;
  } catch (e) {
    if (e.response && e.response.data.message) {
      throw new Error(e.response.data.message);
    }
    // console.log(e);
    throw new Error(e.message);
  }
};

export const updatejobAPI = async (
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
  user,
  token,
  id
) => {
  try {
    const data = axios.put(
      `${baseURL}/api/job/job-post/${id}`,
      {
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
        employer: user,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(data);
    return data;
  } catch (e) {
    if (e.response && e.response.data.message) {
      throw new Error(e.response.data.message);
    }
    // console.log(e);
    throw new Error(e.message);
  }
};

export const getSkillAPI = async (skills) => {
  // console.log(skills); //Array [ "C++","Java" ]
  try {
    const data = await axios.post(`${baseURL}/api/job/get-skill`, {
      skills: skills,
    });
    // console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    // console.log(e.response.data.message, e.response.status);
    if (e.response && e.response.data.message) {
      throw new Error(e.response.data.message, e.response.status);
    }
    console.log(e);
    throw new Error(e.message);
  }
};
export const getAllSkillsAPI = async (skills) => {
  // console.log(skills); //Array [ "C++","Java" ]
  try {
    const data = await axios.get(`${baseURL}/api/job/get-all-skill`, {
      skills: skills,
    });
    // console.log(data);
    return data;
  } catch (e) {
    // console.log(e);
    // console.log(e.response.data.message, e.response.status);
    if (e.response && e.response.data.message) {
      throw new Error(e.response.data.message, e.response.status);
    }
    console.log(e);
    throw new Error(e.message);
  }
};

export const getAllJob = async () => {
  try {
    const data = await axios.get(`${baseURL}/api/job/all-job`);
    return data;
  } catch (e) {
    if (e.response && e.response.data.message) {
      throw new Error(e.response.data.message, e.response.status);
    }
    console.log(e);
    throw new Error(e.message);
  }
};

export const searchJobAPI = async (search) => {
  try {
    const data = await axios.post(`${baseURL}/api/job/search-job`, {
      search: search,
    });
    return data;
  } catch (e) {
    if (e.response && e.response.data.message) {
      throw new Error(e.response.data.message, e.response.status);
    }
    console.log(e);
    throw new Error(e.message);
  }
};
