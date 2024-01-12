import React, { useState, useEffect } from "react";
import { fetchData } from "./utils/apiService";
import ScheduleList from "./components/ScheduleList";
import GenericScheduleModal from "./components/GenericScheduleModal";
import { IoIosAddCircle } from 'react-icons/io';
import { FaSearch } from 'react-icons/fa';


function App() {
  const [data, setData] = useState<Schedule[]>([]);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  interface Schedule {
    id: string;
    title: string;
    description: string;
    subject: string;
    frequency: string;
    repeatOption: string;
    time: string;
  }

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const endpoint = "schedules";

        const dataFromServer = await fetchData<Schedule[]>(endpoint);
        setData(dataFromServer);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchDataFromApi();
  }, []);

  return (
    <>
      <div
        style={{ width: "auto", height: "3rem", backgroundColor: "grey" }}
      ></div>
      <div style={{ display: "flex" }}>
        <div
          style={{ backgroundColor: "purple", height: "100vh", width: "4rem" }}
        ></div>
        <div
          style={{
            backgroundColor: "white",
            width: "100vw",
            padding: "0.75rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "2rem",
            }}
          >
            <div>
            <div
              style={{
                width: "250px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.25rem",
                boxShadow: "0 0 1px 1px",
              }}
            >
              <input
                type="search"
                placeholder="Search"
                style={{ border: "none", outline: "none" }}
                
              />
              <FaSearch />
            </div>
              <button onClick={handleShow}>
                <IoIosAddCircle /> Add
              </button>
              <GenericScheduleModal isOpen={show} onClose={handleClose} />
            </div>
          </div>
          <ScheduleList data={data} />
        </div>
      </div>
    </>
  );
}

export default App;
