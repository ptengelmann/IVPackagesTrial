import Head from 'next/head';
import PackageShowcase from '../components/packages/PackageShowcase';

export default function Home() {
  return (
    <div>
      <Head>
        <title>IV Creative - Package Options</title>
        <meta name="description" content="Explore IV Creative's package options for your business" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <PackageShowcase />
      </main>

      <footer style={{ 
        textAlign: 'center', 
        padding: '2rem', 
        marginTop: '3rem',
        color: '#666',
        fontSize: '0.9rem'
      }}>
        <p>© {new Date().getFullYear()} IV Creative. All rights reserved.</p>
      </footer>
    </div>
  );
}