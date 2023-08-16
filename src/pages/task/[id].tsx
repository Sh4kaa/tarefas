import Head from "next/head";
import styles from "./styles.module.css";
import { GetServerSideProps } from "next";
import { doc, collection, query, where, getDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";

export default function Task() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Detalhes da tarefa</title>
      </Head>
      <div className={styles.main}>
        <h1>Tarefa</h1>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;

  const docRef = doc(db, "Tasks", id);
  const snapshot = await getDoc(docRef);

  if (snapshot.data() === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!snapshot.data()?.public) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const miliseconds = snapshot.data()?.created.seconds * 1000;

  const task = {
    public: snapshot.data()?.public,
    created: new Date(miliseconds).toLocaleDateString(),
    user: snapshot.data()?.user,
    task: snapshot.data()?.task,
    taskID: id,
  };

  return {
    props: { task },
  };
};
