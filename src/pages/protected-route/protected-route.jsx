import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

function ProtectedRoute({ onlyUnAuth = false, component }) {

    const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
    const login = JSON.parse(localStorage.getItem('login'));
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (!isAuthChecked) {
        return null;
    }

    if (onlyUnAuth && login) {
        return <Navigate to={from} />;
    }

    if (!onlyUnAuth && !login) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return component;
}

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }) => (
    <ProtectedRoute onlyUnAuth={true} component={component} />
);