'use client'
import { GoogleLogin, GoogleCredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useMutation } from "@apollo/client";
import { useUser } from "@/context/user/user";
import { POST_GOOGLE } from "@/api/mutations/postLogin";
import { useRouter } from "next/navigation";



export const ButtonGoogle = () => {
    const router = useRouter()

    const { activateAuth } = useUser()

    const [insertLogin, { data }] = useMutation(POST_GOOGLE)
    const handleGoogleSuccess = (credentialResponse: GoogleCredentialResponse) => {
        const credential = credentialResponse?.credential;

        if (credential && typeof credential === 'string') {
            const decoded: any = jwtDecode(credential);
            console.log(decoded);

            const name: string = decoded.name || '';
            const email: string = decoded.email || '';
            const password: string = decoded.sub || '';
            insertLogin({
                variables: { nombre: name, email: email, password: password }
            })
                .then(null)
                .catch(null)
        }
    };

    const onError = () => {
        console.log("Error occurred");
    };

    return (
        <div style={{ display: 'grid', justifyContent: 'center' }}>
            {data && window.sessionStorage.setItem('token', data.LoginGoogle.accessToken)}
            {data && data.LoginGoogle.accessToken && activateAuth && activateAuth(data.LoginGoogle.accessToken)}
            {data && data.LoginGoogle.accessToken && (router.push('/'))}
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={onError}
                useOneTap
                auto_select={true}
            />
        </div>
    );
};
