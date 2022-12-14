import Head from 'next/head'
import Image from 'next/image'
import LoginComponent from '../src/components/Login';
import { useSession } from '../src/hooks';
import Authentication from '../src/ui/Authentication';
import ButtonsGrid from '../src/ui/ButtonsGrid';
import TopBar from '../src/ui/TopBar';
import TweetModal from '../src/ui/TweetModal';
import TweetsGrid from '../src/ui/TweetsGrid'
import styles from '../styles/Home.module.css'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/en';
import CountDownComponent from '../src/components/CountDown';
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('en');

export default function Home() {
  const session = useSession();
  return (
    <div className={styles.container}>
      <Head>
        <title>Tweets Deploy</title>
        <meta name="description" content="Application that post a tweet each day" />
        <meta name="keywords" content="tweet, deploy, deploy tweet" />
        <meta name="author" content="Yoshua Lopez" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yellyoshua" />
        <meta name="twitter:creator" content="@yellyoshua" />
        <meta name="twitter:title" content="Tweets Deploy" />
        <meta name="twitter:description" content="Application that post a tweet each day" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBar />
      <h3 className='font-mono'>Deploy a tweet each day</h3>
      <CountDownComponent />
      <main className='my-20 font-mono'>
        <Authentication session={session} login={<LoginComponent />}>
          <ButtonsGrid />
          <TweetsGrid />
        </Authentication>
      </main>
      <TweetModal />

      <footer className={`${styles.footer} select-none`}>
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
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{__html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "d7wr13071x");
        `}}
      ></script>
    </div>
  )
}
