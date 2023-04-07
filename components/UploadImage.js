import React, { useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { photo } from "@/reducers/user.slice";

export default function UploadImage(props) {
  const [uploading, setUploading] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const dispatch = useDispatch();
  const userRed = useSelector((state) => state.user.value);
  const isLightMode = props.isLightMode;

 

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true); // set uploading state to true

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(
          `https://myhackatweetbackend.vercel.app/users/photo/${token}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const imageResponse = await response.json();
        // console.log("RESPONSE", imageResponse);

        if (imageResponse.result) {
          setProfilePicture(imageResponse.user.photo);
          dispatch(photo(imageResponse.user.photo));
        } else {
          throw new Error("Error uploading image");
        }

        setUploading(false); // set uploading state to false after image is uploaded
      } catch (error) {
        console.log(`Error uploading image: ${error}`);
        setUploading(false); // set uploading state to false if there is an error
      }
    }
  };

  const token = userRed.token;

  const fetchPhoto = async () => {
    try {
      const response = await fetch(
        `https://myhackatweetbackend.vercel.app/users/photoUser/${token}`
      );
      const photoResponse = await response.json();

      if (photoResponse.result) {
        // console.log("PHOTORESPONSE", photoResponse);
        setProfilePicture(photoResponse.profilePicture);
      }
    } catch (error) {
      console.log(`Error, no picture available`);
    }
  };


  useEffect(() => {
    fetchPhoto();
  }, [token]);

return (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      backgroundColor: "gray",
      width: props.isSmallScreen ? "70px" : "90px",
      height: props.isSmallScreen ? "70px" : "90px",
      marginTop: props.isSmallScreen && "10px",
      borderRadius: "50%",
      border: "1px solid",
      borderColor: isLightMode ? "black" : "white",
      overflow: "hidden",
    }}
  >
    {profilePicture ? (
      <>
        <img
          src={profilePicture}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </>
    ) : (
      <div style={{ width: "100%", height: "100%" }}></div>
    )}
    <label
      htmlFor="file-upload"
      style={{
        position: "absolute",
        top: "0",
        left: "50%",
        transform: "translate(-50%, 260%)",
        backgroundColor: isLightMode ? "black" : "white",
        borderRadius: "50%",
        padding: "0.2rem",
        cursor: "pointer",
        zIndex: "1",
      }}
    >
      <AiFillCamera
        size={20}
        style={{
          color: isLightMode ? "white" : "black",
        }}
      />
    </label>
    <input
      id="file-upload"
      type="file"
      name="file"
      disabled={uploading}
      onChange={handleUpload}
      style={{ display: "none" }}
    />
  </div>
);

  



  
}
