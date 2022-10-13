import dynamic from 'next/dynamic';
import Head from 'next/head';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic<{ url: string }>(import((`swagger-ui-react`)), {
    ssr: false,
});

export default function Index() {
    return (
        <div>
            <Head>
                <title>tr3butor REST api</title>
                <meta name="description" content="tr3butor REST api service"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <SwaggerUI url="/swagger.json"/>
        </div>
    );
}