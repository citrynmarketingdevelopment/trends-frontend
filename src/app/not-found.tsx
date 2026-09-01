import Link from "next/link";

import styles from "./status.module.css";

export default function NotFound() {
  return (
    <main className={styles.status} id="main-content" tabIndex={-1}>
      <p>404</p>
      <h1>This page is out of frame.</h1>
      <p>The address does not point to a published page.</p>
      <Link href="/">Return home</Link>
    </main>
  );
}
