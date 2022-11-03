import { createContext, ReactNode } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
    name: string;
    avatarUrl: string;
}

export interface AuthContextDataProps {
    user: UserProps;
    signIn: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
    Google.useAuthRequest({
        client: '',
    });

    console.log(AuthSession.makeRedirectUri({ useProxy: true }));

    async function signIn() {
        console.log('Vamos logar!');
    }

    return (
        <AuthContext.Provider
            value={{
                signIn,
                user: {
                    name: 'Rodrigo',
                    avatarUrl: 'https://github.com/rodrigorgtic.png',
                },
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
