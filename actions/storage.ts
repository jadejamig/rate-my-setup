"use server";

import { storage } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

type UploadImageResponse = {
  error: null | {message: string, code: string},
  success: null | {message: string, code: string, url: string}
}

export async function uploadImage(formdata: FormData): Promise<UploadImageResponse> {
  const file = formdata.get("file") as File;
  const metadata = {
    contentType: file.type,
  };
  const storageRef = ref(storage, `images/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  return new Promise((resolve) => {
    var response: UploadImageResponse = {error: null, success: null};

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle errors here
        switch (error.code) {
          case "storage/unauthorized":
            response = {error: {message: "Upload unauthorized", code: error.code}, success: null};
            resolve(response);
            break;
          case "storage/canceled":
            response = {error: {message: "Uploading cancelled", code: error.code}, success: null};
            resolve(response);
            break;
          case "storage/unknown":
            response = {error: {message: "Storage unknown", code: error.code}, success: null};
            resolve(response);
            break;
        }
        resolve(response);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          response = {error: null, success: {message: "Uploaded", code: "success", url: downloadURL}};
          resolve(response);
        }).catch((error) => {
          response = {error: {message: "Failed to get download URL", code: error.code}, success: null};
          resolve(response);
        });
      }
    );
  });
}
