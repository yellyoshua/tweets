import Head from 'next/head'
import Image from 'next/image'
import LoginComponent from '../src/components/Login';
import { useSession } from '../src/hooks';
import NewTweetModal from '../src/ui/NewTweetModal';
import TweetsGrid from '../src/ui/TweetsGrid'
import styles from '../styles/Home.module.css'

export default function Home() {
  const session = useSession();
  return (
    <div className={styles.container}>
      <Head>
        <title>Tweets Deploy</title>
        <meta name="description" content="Deploy a tweet each day" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='text-lg font-bold font-mono'>Tweets Deploy</h1>
      <h3 className='font-mono'>Deploy a tweet about #100-days-of-code each day</h3>
      <main className='my-20 font-mono'>
      {session
        ? (
          <>
            <NewTweetModal session={session} />
            <TweetsGrid session={session} />
          </>
        )
        : <LoginComponent />
      }
      </main>

      <footer className={styles.footer}>
        <a
          href="https://yoshualopez.com"
          target="_blank"
          className='font-mono text-gray-500'
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/me.png" alt="Yoshua Logo" width={17} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
