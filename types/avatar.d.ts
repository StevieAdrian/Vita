export interface AvatarProps {
    image: string | null;
    uploading: boolean;
    pickPhoto: (type: "camera" | "gallery") => Promise<void>;
}

export type FileProps = {
    uri: string;
    type?: string;
    name?: string;
};

export interface AvatarPickerProps {
    imageUrl?: string;
    onChangeImage: (url: string) => void; 
    size?: number;
}