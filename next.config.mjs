/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:["openweathermap.org","lh3.googleusercontent.com","avatars.githubusercontent.com","bankerjobs.asia"]
    },
    experimental:{
        serverActions:true
    }
};

export default nextConfig;
