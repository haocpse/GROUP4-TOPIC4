import { Outlet, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoutesCustomer = () => {
    const token = localStorage.getItem("token");
    const role = getRoleFromToken()
    return role === "CUSTOMER" ? <Outlet/> : <Navigate to="/login"/> 
}

function getRoleFromToken() {
    // Get token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
        // Decode the token
        const decodedToken = jwtDecode(token);

        // Assuming the roles are stored under a "scope" or "roles" claim
        // This depends on how you structured the claims in your backend
        const roles = decodedToken.scope || decodedToken.roles || decodedToken.authorities;

        return roles; // Returns the roles, for example ["ROLE_USER", "ROLE_ADMIN"]
    }

    return null;
}

export default ProtectedRoutesCustomer;