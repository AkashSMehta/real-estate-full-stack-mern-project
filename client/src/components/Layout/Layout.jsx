import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useMutation } from 'react-query';
import { Outlet } from 'react-router-dom';
import UserDetailContext from '../../context/UserDetailContext';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useAuth0 } from "@auth0/auth0-react";
import { createUser } from '../../utils/api';
import useFavourites from '../../hooks/useFavourites';
import useBookings from '../../hooks/useBookings';

const Layout = () => {

    useFavourites()
    useBookings()

    const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0()
    const { setUserDetails } = useContext(UserDetailContext)

    const { mutate } = useMutation({
        mutationKey: [user?.email],
        mutationFn: (token) => createUser(user?.email, token),
    })

    useEffect(() => {

        const getTokenAndRegister = async () => {
            const res = await getAccessTokenWithPopup({
                authorizationParams: {
                    audience: "http://localhost:8000",
                    scope: "openid profile email"
                },
            });

            localStorage.setItem("access_token", res)
            setUserDetails((prev) => ({ ...prev, token: res }))
            // console.log(res) Token : eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklTb3c1aXh3OHVrMnA1UnlmeUJNMyJ9.eyJpc3MiOiJodHRwczovL2Rldi1jaHRkeGl5azBnaWh0eDVtLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwMzM4MTI2OTE3ODk2MDc2NTU5MCIsImF1ZCI6WyJodHRwOi8vbG9jYWxob3N0OjgwMDAiLCJodHRwczovL2Rldi1jaHRkeGl5azBnaWh0eDVtLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2OTg1NTEwODQsImV4cCI6MTY5ODYzNzQ4NCwiYXpwIjoiV0dCQklzckc0cnpLd3ExUGp2TzJKU0oxamlaR1BVNHYiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.V7UNGbaO_1DAX8aZyqhaJGU0gHZ6FsdSFpCMLRFHJ3KECp-vW-SPJf-uz3NSJgPjCo_m06bXs8gVurVfbJ46bVNj_maS0E1MFZo8IZ2_ywNSTVPWsB0eU8EnsXU8UsuNcD9k9zKBTSupHdUlECanp0Wq8gAMGm91HWllJNhYTolP6TdYcDaq0PXhGgVtBTOLo2iC_qjWgvzcHtcosu1gHw9AWhj9hjRWKcZ-EZL1ho9GspUpcRpit0GuQEyZ-XvzV2VabNiDc4gGrHQj50uBN1cIXMZjaEFUWvRcNL-naQVg623g1jtHWbUrCYbTHYYoEraNTxBV-WCACSRHQXcSnw
            mutate(res)
        };

        isAuthenticated && getTokenAndRegister()

    }, [isAuthenticated]);

    return (
        <>
            <div style={{ background: "var(--black)", overflow: "hidden" }}>
                <Header />
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Layout