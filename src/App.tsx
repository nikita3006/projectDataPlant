import React, { useState, useEffect } from 'react';
import { fetchData } from './utils/apiService';
import { FaSearch } from 'react-icons/fa';
import ScheduleList from './components/ScheduleList';
import AddScheduleModal from './components/AddScheduleModal';

function App() {
  const [data, setData] = useState<Schedule[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [performReload, setPerformReload] = useState<string>('');

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
        const searchData = searchInput.trim();
        const endpoint = searchData
          ? `schedules?title_like=${searchData}`
          : "schedules";
        {/* @ts-ignore */}
        const dataFromServer = await fetchData<Schedule[]>(endpoint);
        setData(dataFromServer);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchDataFromApi();
  }, [searchInput, performReload]);

  const reload = (value: string) => {
    setPerformReload(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <>
      <div style={{ width: "auto", height: "3rem", backgroundColor: "grey" }}></div>
      <div style={{ display: "flex" }}>
        <div style={{ backgroundColor: "purple", height: "100vh", width: "4rem" }}></div>
        <div style={{ backgroundColor: "white", width: "100vw", padding: "0.75rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", margin: "2rem" }}>
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
                onChange={handleSearchChange}
              />
              <FaSearch />
            </div>
            <div>
              <AddScheduleModal
                reload={reload}
              />
            </div>
          </div>
          <ScheduleList data={data} reload={reload} />
        </div>
      </div>
    </>
  );
}

export default App;
