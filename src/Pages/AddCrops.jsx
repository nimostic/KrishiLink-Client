import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../Provider/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddCrops = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newCrops = {
      name: form.name.value,
      type: form.type.value,
      pricePerUnit: form.pricePerUnit.value,
      unit: form.unit.value,
      quantity: form.quantity.value,
      description: form.description.value,
      location: form.location.value,
      imageURL: form.imageURL.value,
      createdAt: new Date(),
      owner: {
        ownerId: user.accessToken,
        ownerName: user?.displayName,
        ownerEmail: user?.email,
      },
      interests :{
        
      }
    };

    axiosSecure.post("/crops", newCrops).then((data) => {
      Swal.fire({
        title: `Added Successfully`,
        icon: "success",
        draggable: true,
        timer: 1500,
      });
      navigate("/my-posts");
    });

    form.reset();
  };

  return (
    <StyledWrapper>
      <form onSubmit={handleSubmit} className="form container mx-auto">
        <p className="title">Add a Crop</p>
        <div className="flex">
          <label>
            <input required type="text" name="name" className="input" />
            <span>Name</span>
          </label>
          <label>
            <input required type="text" name="type" className="input" />
            <span>Type</span>
          </label>
        </div>

        <label>
          <input required type="text" name="pricePerUnit" className="input" />
          <span>Price Per Unit</span>
        </label>
        <label>
          <input required type="text" name="unit" className="input" />
          <span>Unit</span>
        </label>
        <label>
          <input required type="text" name="quantity" className="input" />
          <span>Quantity</span>
        </label>

        <label>
          <textarea
            required
            name="description"
            className="input textarea"
            rows="3"
          ></textarea>
          <span>Description</span>
        </label>

        <label>
          <input required type="text" name="location" className="input" />
          <span>Location</span>
        </label>
        <label>
          <input required type="text" name="imageURL" className="input" />
          <span>Image URL</span>
        </label>

        <button className="submit">Submit</button>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 400px;
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    position: relative;
    box-shadow: 0 4px 20px rgba(0, 128, 0, 0.1);
  }

  .title {
    font-size: 28px;
    color: #00b56a;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
  }

  .title::before,
  .title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: #00b56a;
  }

  .title::before {
    width: 18px;
    height: 18px;
    background-color: #00b56a;
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .flex {
    display: flex;
    width: 100%;
    gap: 6px;
  }

  .form label {
    position: relative;
  }

  /* common style for input and textarea */
  .form label .input {
    width: 100%;
    padding: 10px;
    outline: 0;
    border: 1px solid rgba(0, 128, 0, 0.3);
    border-radius: 10px;
    resize: vertical; /* allows textarea resizing */
    min-height: 40px;
  }

  .form label .textarea {
    min-height: 60px; /* at least 3 lines */
  }

  .form label .input + span {
    position: absolute;
    left: 10px;
    top: 15px;
    color: #777;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:focus + span,
  .form label .input:valid + span {
    top: -8px;
    font-size: 0.7em;
    font-weight: 600;
    background: #fff;
    padding: 0 4px;
  }

  .form label .input:valid + span {
    color: #00b56a;
  }

  .submit {
    border: none;
    outline: none;
    background-color: #00b56a;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    transition: 0.3s ease;
  }

  .submit:hover {
    background-color: #009d5c;
    box-shadow: 0 0 10px rgba(0, 180, 100, 0.3);
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
      background-color: #00b56a;
    }
    to {
      transform: scale(1.8);
      opacity: 0;
      background-color: #a3ffcb;
    }
  }
`;

export default AddCrops;
