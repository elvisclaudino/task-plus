import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

import { db } from "@/services/firebaseConnection";
import { addDoc, collection } from "firebase/firestore";

import { FiShare2 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

import styles from "./styles.module.css";
import Head from "next/head";
import { Textarea } from "@/components/textarea";

interface DashboardProps {
  user: {
    email: string;
  };
}

export default function Dashboard({ user }: DashboardProps) {
  const [input, setInput] = useState("");
  const [publicTask, setPublicTask] = useState(false);

  function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
    setPublicTask(event.target.checked);
  }

  async function handleRegisterTask(event: FormEvent) {
    event.preventDefault();

    if (input === "") return;

    try {
      await addDoc(collection(db, "tasks"), {
        task: input,
        created: new Date(),
        user: user?.email,
        public: publicTask,
      });

      setInput("");
      setPublicTask(false);
    } catch (error) {
      console.error("Erro ao registrar tarefa", error);
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
                placeholder="Digite qual a sua tarefa"
                value={input}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                  setInput(event.target.value)
                }
              />
              <div className={styles.checkboxArea}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={publicTask}
                  onChange={handleChangePublic}
                />
                <label>Deixar tarefa pública?</label>
              </div>

              <button type="submit" className={styles.button}>
                Registrar
              </button>
            </form>
          </div>
        </section>

        <section className={styles.taskContainer}>
          <h1>Minhas tarefas</h1>

          <article className={styles.task}>
            <div className={styles.tagContainer}>
              <label className={styles.tag}>PÚBLICA</label>
              <button className={styles.shareButton}>
                <FiShare2 size={22} color="#3183ff" />
              </button>
            </div>
            <div className={styles.taskContent}>
              <p>Tarefa de exemplo</p>
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
        email: session?.user?.email,
      },
    },
  };
};
