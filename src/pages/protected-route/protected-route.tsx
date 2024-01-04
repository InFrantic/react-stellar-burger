import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../../services/store";

type TPropsProtected = {
    onlyUnAuth?: boolean;
    component: JSX.Element
}

type TPropsUnAuth = Pick<TPropsProtected, "component">

function ProtectedRoute({ onlyUnAuth = false, component }: TPropsProtected) {

    const isAuthChecked = useAppSelector((store) => store.user.isAuthChecked);
    const user = useAppSelector((store) => store.user.user);
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (!isAuthChecked) {
        return null;
    }

    if (onlyUnAuth && user) {
        return <Navigate to={from} />;
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return component;
}

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }: TPropsUnAuth) => (
    <ProtectedRoute onlyUnAuth={true} component={component} />
);