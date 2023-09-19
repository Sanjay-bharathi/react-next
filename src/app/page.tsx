import { getStudents } from "api/students";
import styles from "./page.module.scss";

interface StudnetType {
  status: boolean;
  data: {
    [key: string]: any;
  }[];
}

const Home = async () => {
  const { data, status }: StudnetType = await getStudents();

  if (!status) return <h1>Error</h1>;

  console.log("1->data->", data);

  return (
    <section className={styles.container}>
      <h1 className={styles.welcome}>Welcome</h1>
    </section>
  );
};

export default Home;
