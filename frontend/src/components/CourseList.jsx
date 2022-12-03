import axios from "axios";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";


const CourseList = () => {
  const [courses, setCourses] = useState([]);

  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("/api/courses", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => console.error(err));
  }, [authTokens.access]);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-10">Your Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {courses.map((course) => (
          <Link to={`/course/${course.code}`}>
            <div
              key={course.code}
              className="bg-white p-4 rounded-md hover:shadow-md"
            >
              <div className="text-sm text-slate-400">{course.code}</div>
              <div className="font-semibold">{course.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
