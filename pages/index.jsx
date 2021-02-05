import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />

        <Link href="/notes">
          Notes
        </Link>
      </Head>

      <main className={styles.main}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis adipisci excepturi eos ratione maxime commodi corrupti vitae voluptatem beatae nam pariatur aut magni maiores ea voluptatum sed repellat, quibusdam iste.
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
