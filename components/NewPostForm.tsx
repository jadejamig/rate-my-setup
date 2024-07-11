import { Modal, Box, Icon } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { IconPhoto, IconLoader2 } from "@tabler/icons-react";
import TextField from "@mui/material/TextField";
import { uploadImage } from "@/actions/storage";
import { useTransition } from "react";
import { toast } from 'sonner';

interface NewPostFormProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function NewPostForm({ open, setOpen }: NewPostFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [isUploading, startUpload] = useTransition();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes

    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
      } else if (file.size > maxSize) {
        toast.error("Please select an image file that is 2MB or below");
      } else {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="max-h-[90dvh] outline-none overflow-y-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90dvw] sm:max-w-[500px] shadow-lg p-6 sm:px-10 bg-white dark:bg-dark-200 dark:text-dark-600 rounded-lg">
        <p className="text-2xl font-bold my-6">Create a new post</p>
        <div className="flex flex-col gap-4">
          <div>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<IconPhoto className="text-white" />}
              style={{ backgroundColor: "#10b981" }}
            >
              <p className="text-white">{selectedImage ? "Change" : "Upload"} image</p>
              <VisuallyHiddenInput type="file" onChange={handleImageChange} accept="image/*" disabled={isUploading}/>
            </Button>
          </div>
          {selectedImage && (
            <div>
              <img
                src={selectedImage}
                alt="Selected"
                className="rounded shadow-md"
              />
            </div>
          )}
          <TextField
            id="filled-multiline-static"
            label="Description"
            multiline
            rows={4}
            variant="filled"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}
            disabled={isUploading}
          />
          <div className="flex items-center justify-end">
          <Button
              type="button"
              variant="contained"
              style={{ backgroundColor: !description || !selectedImage ? "gray" : "#10b981" }}
              disabled={!description || !selectedImage || isUploading}
              onClick={() => {
                const formdata = new FormData();
                formdata.append("file", selectedFile!);
                startUpload(async () => {
                  const data = await uploadImage(formdata);
                  console.log({data})
                  if (data.error) {
                    toast.error(data.error.message);
                    return;
                  }
                  if (data.success) {
                    toast.success(data.success.message, {position: "top-center"});
                  }
                });
              }}
            >
              {isUploading ? <IconLoader2 className="animate-spin" /> : <p className="text-white">Post</p>}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
