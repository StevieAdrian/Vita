import { Alert, View } from "react-native";
import { styles } from "@/styles/profile/password-form.styles";
import InputField from "../InputField";
import PrimaryButtonColorForm from "../utils/PrimaryButtonColorForm";
import { useChangePassword } from "@/hooks/useChangePassword";
import { ChangePasswordValues } from "@/types/auth";
import { useState } from "react";
import ModalSuccess from "../utils/ModalSuccess";
import ModalError from "../utils/ModalError";

export default function PasswordForm() {
    const [values, setValues] = useState<ChangePasswordValues>({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const { changePassword, loading } = useChangePassword();
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (field: keyof ChangePasswordValues, value: string) => {
        const newValues = { ...values, [field]: value };
        setValues(newValues);
    };

    const handleSubmit = async () => {
        if (values.newPassword !== values.confirmNewPassword) {
            setErrorMessage("New password and confirmation do not match");
            setShowError(true);
            return;
        }

        try {
            await changePassword(values.oldPassword, values.newPassword);
            setValues({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
            setShowSuccess(true);
        } catch (err: any) {
            setErrorMessage("Failed to update password, invalid credential.");
            setShowError(true);
        }
    };

    const hasInput = values.oldPassword !== "" && values.newPassword !== "" && values.confirmNewPassword !== "";

    return (
        <View style={styles.container}>
            <InputField label="Current Password" value={values.oldPassword} secureTextEntry required onChangeText={(text) => handleChange("oldPassword", text)}/>
            <InputField label="New Password" value={values.newPassword} secureTextEntry required onChangeText={(text) => handleChange("newPassword", text)}/>
            <InputField label="Confirm New Password" value={values.confirmNewPassword} secureTextEntry required onChangeText={(text) => handleChange("confirmNewPassword", text)}/>

            <PrimaryButtonColorForm text="Save Changes" active={hasInput} onPress={handleSubmit}/>

            <ModalSuccess
                visible={showSuccess}
                title="Success"
                description="Your password has been successfully updated."
                buttonText="Continue"
                onClose={() => setShowSuccess(false)}
            />

            <ModalError
                visible={showError}
                title="Error"
                description={errorMessage}
                buttonText="Continue"
                onClose={() => setShowError(false)}
            />
        </View>
    )
}