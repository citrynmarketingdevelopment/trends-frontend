"use client";

import styles from "./status.module.css";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className={styles.status} id="main-content" tabIndex={-1}>
      <h1>The finish needs another pass.</h1>
      <p>The page could not be prepared. Try the request again.</p>
      <button onClick={reset} type="button">
        Try again
      </button>
    </main>
  );
}
