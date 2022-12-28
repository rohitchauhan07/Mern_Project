import React, { useState, useEffect } from "react";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);

  const userHomepage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      // console.log(data);
      setUserName(data.name);
      setShow(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userHomepage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="home-page">
        <div className="home-div">
          <p className="home-page-welcome mx-auto pt-5">WELCOME</p>
          <h1 className="home-page-name mx-auto pt-5">{userName}</h1>
          <h2 className="home-page-back mx-auto pt-5">
            {show ? "Happy,to see you back" : "We are the MERN Developer"}{" "}
          </h2>
        </div>
      </div>
    </>
  );
};

export default Home;
