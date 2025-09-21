import handleUpData from "@/hooks/useCloudinary";
import { AvatarProps, FileProps } from "@/types/avatar";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";

export function useAvatarPicker(initialImageUrl?: string, onChangeImage?: (url: string) => void): AvatarProps {
    const [image, setImage] = useState<string | null>(initialImageUrl || null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (initialImageUrl) setImage(initialImageUrl);
    }, [initialImageUrl]);

    const pickPhoto = async (type: "camera" | "gallery") => {
        try {
            setUploading(true);
            let result: ImagePicker.ImagePickerResult;

            if (type === "camera") {
                result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1,1],
                    quality: 1,
                });
            } else {
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1,1],
                    quality: 1,
                });
            }

            if (!result.canceled) {
                setUploading(true);

                const file: FileProps = {
                    uri: result.assets[0].uri,
                    type: "image/jpeg",
                    name: "upload.jpg",
                };

                setImage(file.uri);

                const url = await handleUpData(file);
                if (url) {
                    setImage(url);
                    onChangeImage?.(url);
                }
            }
        } catch (err: any) {
            throw new Error (err.message || "Something went wrong.");
        } finally {
            setUploading(false);
        }
        
    };

    return { image, uploading, pickPhoto };
}