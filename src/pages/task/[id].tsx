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
  // Fazendo referência ao banco
  const docRef = doc(db, "Tasks", id);
  //puxando informações do banco por meio da referência
  const snapshot = await getDoc(docRef);
// verificando se os dados são undefined, caso sejam, redirecione para página home
  if (snapshot.data() === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  // Verificando se o status da tarefa é publica, caso negativo, redireciona para a home
  if (!snapshot.data()?.public) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  // convertendo datas
  const miliseconds = snapshot.data()?.created.seconds * 1000;
//montando o objeto para devolver ao front
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
