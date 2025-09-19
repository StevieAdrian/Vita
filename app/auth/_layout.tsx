import { AuthContext } from "@/context/AuthContext"
import { Stack } from "expo-router"

const Layout = () => {
    return (
        <AuthContext>
            <Stack />
        </AuthContext>
    )
}

export default Layout;