import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

const GOOGLE_CLIENT_ID = "client_id";
const GOOGLE_CLIENT_SECRET = "client_secret";

const FACEBOOK_CLIENT_ID = "client_id";
const FACEBOOK_CLIENT_KEY = "client_secret";

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        }),
        FacebookProvider({
            clientId: FACEBOOK_CLIENT_ID,
            clientSecret: FACEBOOK_CLIENT_KEY,
        })
    ],
    callbacks: {
        signIn({ account, profile }) {
            return true // Do different verification for other providers that don't have `email_verified`
        },
        jwt({ token, account }) {
            if (account) {
                // Lưu access_token vào JWT token khi người dùng đăng nhập thành công
                token.access_token = account.access_token;
            }
            return token;
        },
        session({ session, token }) {
            // Truyền access_token từ JWT vào session để có thể truy xuất ở phía client
            return {...session, access_token: token.access_token };
        }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };