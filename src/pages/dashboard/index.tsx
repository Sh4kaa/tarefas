import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { ChangeEvent, useState, FormEvent } from "react";
import Head from "next/head";
import styles from "./styles.module.css";
import { Textarea } from "@/components/textarea";
import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { db } from "@/services/firebaseConnection";
import { collection, addDoc } from "firebase/firestore";

interface HomeProps {
  user: {
    email: string
  }
}

export default function Dashboard({user}: HomeProps) {
  const [input, setinput] = useState("");
  const [publicTask, setPublicTask] = useState(false);

  function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
    setPublicTask(event.target.checked);
  }

  async function handleRegisterTask(event: FormEvent) {
    event.preventDefault();
    if(input === '') {
      alert('Você precisa cadastrar uma tarefa')
      return;
    }
    try {
      await addDoc(collection(db, 'Tasks'),{
        task: input,
        created: new Date(),
        user: user?.email,
        public: publicTask
      })
      setinput('')
      setPublicTask(false)
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Meu painel de tarefas</title>
      </Head>

      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>Qual sua tarefa?</h1>

            <form onSubmit={handleRegisterTask}>
              <Textarea
                placeholder="Digite qual sua tarefa..."
                value={input}
                onChange={({ target }: ChangeEvent<HTMLTextAreaElement>) =>
                  setinput(target.value)
                }
              />
              <div className={styles.checkboxArea}>
                <input
                  type="checkbox"
                  checked={publicTask}
                  onChange={handleChangePublic}
                  className={styles.checkbox}
                />
                <label>Deixar tarefa publica?</label>
              </div>

              <button className={styles.button} type="submit">
                Registrar
              </button>
            </form>
          </div>
        </section>

        <section className={styles.taskContainer}>
          <h1>Minhas tarefas</h1>

          <article className={styles.task}>
            <div className={styles.tagContainer}>
              <label className={styles.tag}>PUBLICO</label>
              <button className={styles.shareButton}>
                <FiShare2 size={22} color="#3183ff" />
              </button>
            </div>

            <div className={styles.taskContent}>
              <p>Minha primeira tarefa de exemplo show demais!</p>
              <button className={styles.trashButton}>
                <FaTrash size={24} color="#ea3140" />
              </button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: {
        email: session?.user?.email
      }
    },
  };
};
