/** @type {import('next').NextConfig} */
//Cloudinary is being used for image processing in this projects
// So it is important to mention it here
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:["res.cloudinary.com"]
  }
}

module.exports = nextConfig
