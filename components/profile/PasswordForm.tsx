import { View } from "react-native";
import { styles } from "@/styles/profile/password-form.styles";
import InputField from "../InputField";
import PrimaryButtonColorForm from "../utils/PrimaryButtonColorForm";
import { useUserProfile } from "@/hooks/useUserProfile";
import { ChangePasswordValues } from "@/types/auth";
import { useState } from "react";

export default function PasswordForm() {
    const [hasInput, setHasInput] = useState(false);
    const [values, setValues] = useState<ChangePasswordValues>({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    
    const handleChange = (field: keyof ChangePasswordValues, value: string) => {
        const newValues = { ...values, [field]: value };
        setValues(newValues);
    };

    return (
        <View style={styles.container}>
            <InputField label="Current Password" value={values.oldPassword} secureTextEntry required onChangeText={(text) => handleChange("oldPassword", text)}/>
            <InputField label="New Password" value={values.newPassword} secureTextEntry required onChangeText={(text) => handleChange("newPassword", text)}/>
            <InputField label="Confirm New Password" value={values.confirmNewPassword} secureTextEntry required onChangeText={(text) => handleChange("confirmNewPassword", text)}/>

            <PrimaryButtonColorForm text="Save Changes" active={hasInput} />
        </View>
    )
}