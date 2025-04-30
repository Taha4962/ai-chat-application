import React, { useRef } from "react";
import { IKContext, IKUpload } from "imagekitio-react";

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;

// Function to authenticate the upload request
const authenticator = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/v1/upload`,
      { credentials: "include" }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const { expire, signature, token } = await response.json();
    return { expire, signature, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Upload = ({ setImg }) => {
  const ikUploadRef = useRef(null);

  // Handle upload errors
  const onError = (err) => {
    console.error("Upload Error:", err);
  };

  // Handle successful upload
  const onSuccess = (res) => {
    console.log("Upload Success:", res);
    setImg((prev) => ({ ...prev, isLoading: false, dbData: res }));
  };

  // Handle upload progress
  const onUploadProgress = (progress) => {
    console.log("Upload Progress:", progress);
  };

  // Handle upload start and prepare inline data
  const onUploadStart = (evt) => {
    const file = evt.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImg((prev) => ({
        ...prev,
        isLoading: true,
        aiData: {
          inlineData: {
            data: reader.result.split(",")[1],
            mimeType: file.type,
          },
        },
      }));
    };

    reader.readAsDataURL(file);
  };

  return (
    <IKContext
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        fileName="test-upload.png"
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        onUploadProgress={onUploadProgress}
        onUploadStart={onUploadStart}
        style={{ display: "none" }}
        ref={ikUploadRef}
      />
      <label onClick={() => ikUploadRef.current.click()}>
        <img src="/attachment.png" alt="Upload Attachment" />
      </label>
    </IKContext>
  );
};

export default Upload;
