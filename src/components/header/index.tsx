import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import styles from "@/components/header/styles.module.css";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <nav className={styles.nav}>
          <Link href="/">
            <h1 className={styles.logo}>
              Tarefas<span>+</span>
            </h1>
          </Link>
          <Link href="/dashboard" className={styles.link}>
            Meu Painel
          </Link>
        </nav>
        {status === "loading" ? (
          <></>
        ) : session ? (
          <button className={styles.LoginButton} onClick={() => signOut()}>
            olá {session?.user?.name}
          </button>
        ) : (
          <button className={styles.LoginButton} onClick={() => signIn('google')}>
            Acessar
          </button>
        )}
      </section>
    </header>
  );
}
