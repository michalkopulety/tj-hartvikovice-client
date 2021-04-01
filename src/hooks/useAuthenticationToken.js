import {
    useState,
    useEffect
} from "react";
import {
    useAuth0
} from "@auth0/auth0-react";

export default function useAuthenticationToken(isAuthenticated) {
    const [token, setToken] = useState();
    const {
        getAccessTokenSilently
    } = useAuth0();

    useEffect(() => {
        (async () => {
            try {
                const authToken = isAuthenticated ? await getAccessTokenSilently({
                    audience: "https://hartal-portal.herokuapp.com/api",
                    scope: "read:players read:trainings create:players create:trainings"
                }) : undefined;
                setToken(authToken);
            } catch (e) {
                console.log(e);
            }
        })();
    }, [getAccessTokenSilently, isAuthenticated]);

    return token
}