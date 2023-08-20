import Head from "next/head";
import styles from "./styles.module.css";
import { GetServerSideProps } from "next";
import { doc, collection, query, where, getDoc, addDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";
import { Textarea } from "@/components/textarea";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";

type TaskProps = {
  dataTasks: {
    public: boolean;
    created: string;
    user: string;
    task: string;
    taskID: string;
  };
};

export default function Task({ dataTasks }: TaskProps) {
  const [input, setInput] = useState("");
  const { data: session } = useSession();

  async function handleComment(event: FormEvent) {
    event.preventDefault();

    if (input === "") return;

    if (!session?.user?.email || !session?.user?.name) return;

    try {
      const docRef = await addDoc(collection(db, "comments"), {
        comment: input,
        created: new Date(),
        user: session?.user?.email,
        name: session?.user?.name,
        taskId: dataTasks?.taskID,
      });
      setInput("");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Tarefa - Detalhes da tarefa</title>
      </Head>

      <main className={styles.main}>
        <h1>Tarefa</h1>
        <article className={styles.task}>
          <p>{dataTasks.task}</p>
        </article>
      </main>

      <section className={styles.commentsContainer}>
        <h2>Deixar comentário</h2>

        <form onSubmit={handleComment}>
          <Textarea
            placeholder="Digite seu comentário..."
            value={input}
            onChange={({ target }: ChangeEvent<HTMLTextAreaElement>) =>
              setInput(target.value)
            }
          />
          <button disabled={!session?.user} className={styles.button}>
            Enviar comentário
          </button>
        </form>
      </section>
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
  const dataTasks = {
    public: snapshot.data()?.public,
    created: new Date(miliseconds).toLocaleDateString(),
    user: snapshot.data()?.user,
    task: snapshot.data()?.task,
    taskID: id,
  };

  return {
    props: { dataTasks },
  };
};
