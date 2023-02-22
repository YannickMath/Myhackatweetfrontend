import cloudinary from "cloudinary-core";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function uploadImage() {
  const [imageUrl, setImageUrl] = useState(null);

  const userRed = useSelector((state) => state.user.value);

  const fetchPhoto = async () => {
    try {
      const photo = await fetch("http://localhost:3000/user/photo");
      const data = await response.json();

      if (photo) {
        setImageUrl(user.imageUrl);
      }
    } catch (error) {
      console.log(`Error fetching user data : ${error}`);
    }
  };

  useEffect(() => {
    fetchPhoto();
  }, [userRed.token]);

  return;
}
