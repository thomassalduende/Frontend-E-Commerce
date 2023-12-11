'use client'
import { CountCartProvider } from "./carrito/countCart";
import { CartProvider } from "./carrito/cart";
import { ReactNode } from "react";
import { UserProvider } from "./user/user";
import { GoogleOAuthProvider } from "@react-oauth/google";
import createApolloClient from "@/api/apollo/apollo";
import { ApolloProvider } from "@apollo/client";


export function Providers({ children }: { children: ReactNode }) {

    const client = createApolloClient();

    return (
        <UserProvider>
            <ApolloProvider client={client}>
                <CountCartProvider>
                    <GoogleOAuthProvider clientId='1013528538582-rgdspt2m2vqct6hrtj7e3s3m9r587gnq.apps.googleusercontent.com'>
                        <CartProvider>
                            {children}
                        </CartProvider>
                    </GoogleOAuthProvider>
                </CountCartProvider>
            </ApolloProvider>
        </UserProvider>
    )
}