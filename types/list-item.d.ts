export interface ListItemProps {
    title: string;
    subtitle?: string;
    leftIcon?: ImageSourcePropType;
    onPress?: () => void;
    danger?: boolean; 
}