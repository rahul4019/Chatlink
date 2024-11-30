import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const ImageCropper = () => {
  const [picture, setPicture] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPicture(file);
      setPreview(URL.createObjectURL(file)); // create an url
    }
    console.log("picture: ", picture);
  };
  return (
    <>
      <Label htmlFor="picture">Choose Picture</Label>
      <Input
        id="picture"
        type="file"
        accept="image/*"
        onChange={handlePictureChange}
      />
      <div>
        {preview && (
          <img src={preview} alt="uploaded preview" className="w-16 h-16" />
        )}
      </div>
    </>
  );
};

export default ImageCropper;
