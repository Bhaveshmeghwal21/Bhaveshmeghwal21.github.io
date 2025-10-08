import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Bhavesh Meghwal - Aerial Robotics Engineer specializing in autonomous systems, PX4 development, and drone technology at IIT BHU" />
        <meta name="keywords" content="Bhavesh Meghwal, Aerial Robotics, PX4, Drone Engineer, IIT BHU, Autonomous Systems, ROS, Computer Vision" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Bhavesh Meghwal - Aerial Robotics Engineer" />
        <meta property="og:description" content="Portfolio of Bhavesh Meghwal, specializing in aerial robotics, PX4 development, and autonomous drone systems" />
        <meta property="og:image" content="/images/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bhavesh Meghwal - Aerial Robotics Engineer" />
        <meta name="twitter:description" content="Portfolio of Bhavesh Meghwal, specializing in aerial robotics, PX4 development, and autonomous drone systems" />
        <meta name="twitter:image" content="/images/og-image.jpg" />
      </Head>
      <body className="dark">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
