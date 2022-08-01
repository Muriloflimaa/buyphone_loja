import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <Html className="bg-Primary">
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    />
                </Head>
                <body className="bg-Primary">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
