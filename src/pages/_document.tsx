import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <Html className="bg-Primary">
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;900&amp;display=swap"
                        rel="stylesheet"
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
