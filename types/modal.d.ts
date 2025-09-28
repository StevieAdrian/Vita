export interface ModalProps {
  visible: boolean;
  title?: string; 
  description?: string;
  buttonText?: string; 
  onClose?: () => void;
};