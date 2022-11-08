import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta
            name="description"
            content="Iphone em promoção que você procura? Na Buy Phone você encontra as melhores ofertas de produtos com entrega rápida e frete grátis!"
          />
          <meta
            name="keywords"
            content="iphone, apple, buyphone, descontos, apple watch, ipad, macbook, imac"
          ></meta>
          <meta name="copyright" content="BuyPhone"></meta>
          <meta
            name="subject"
            content="Garanta seu iphone novo com um match perfeito!"
          ></meta>
          <link rel="icon" type="image/ico" href="/favicon.ico" />
          <meta charSet="utf-8" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;900&amp;display=swap"
            rel="stylesheet"
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-YNHEGF886T"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
   window.dataLayer = window.dataLayer || [];
   function gtag(){dataLayer.push(arguments);}
   gtag('js', new Date());
   gtag('config', 'G-YNHEGF886T');`,
            }}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WPLT875')`,
            }}
          ></script>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-WPLT875"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
