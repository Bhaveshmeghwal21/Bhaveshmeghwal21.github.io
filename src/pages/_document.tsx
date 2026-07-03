import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta
          name="description"
          content="Bhavesh Meghwal builds robotics, AI, and product systems across flight control, operator tooling, and applied software products."
        />
        <meta
          name="keywords"
          content="Bhavesh Meghwal, robotics engineer, AI product builder, PX4, drones, autonomous systems, product systems, IIT BHU"
        />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Bhavesh Meghwal | Robotics, AI, and product systems" />
        <meta
          property="og:description"
          content="Portfolio, case studies, and writing by Bhavesh Meghwal."
        />
        <meta property="og:image" content="/images/og-card.svg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bhavesh Meghwal | Robotics, AI, and product systems" />
        <meta
          name="twitter:description"
          content="Portfolio, case studies, and writing by Bhavesh Meghwal."
        />
        <meta name="twitter:image" content="/images/og-card.svg" />
      </Head>
      <body className="dark">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
