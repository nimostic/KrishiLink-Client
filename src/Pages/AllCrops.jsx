import React, { use, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Provider/AuthContext";
import Card from "../Components/Card";
import styled from "styled-components";
import Loading from "../Components/Loading";

const AllCrops = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const [text, setText] = useState("");
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  //   console.log(user);

  useEffect(() => {
    if (text.trim() === "") {
      axiosSecure.get(`/crops`).then((result) => {
        setCrops(result.data);
        setLoading(false);
      });
    } else {
      axiosSecure.get(`/search?search=${text}`).then((result) => {
        setCrops(result.data);
        // console.log(result.data);
        setLoading(false);
      });
    }
  }, [text, axiosSecure]);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    // console.log(value);
  };

  return (
    <PageWrapper>
      <div className="container mx-auto py-8 px-4">
        {/* Search */}
        <SearchWrapper>
          <input
            type="search"
            placeholder="Search crops..."
            value={text}
            onChange={handleChange}
            className="search-input"
          />
        </SearchWrapper>

        {/* Loader */}
        {loading && <Loading></Loading>}

        {/* Results */}
        {!loading && (
          <>
            {crops.length === 0 ? (
              <div className="text-center text-gray-500 mt-12 text-lg">
                No crops found
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                {crops.map((singleCrop) => (
                  <Card singleCrop={singleCrop} key={singleCrop._id} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </PageWrapper>
  );
};

export default AllCrops;

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f5f8f7;
`;

const SearchWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;

  .search-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 12px;
    border: 2px solid #d1e5d0;
    outline: none;
    font-size: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:focus {
      border-color: #00b56a;
      box-shadow: 0 4px 12px rgba(0, 181, 106, 0.2);
    }
  }

  @media (max-width: 640px) {
    .search-input {
      font-size: 0.95rem;
      padding: 0.6rem 0.9rem;
    }
  }
`;
