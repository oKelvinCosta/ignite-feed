import Header from "./components/Header";
import styles from "./App.module.css";
import Sidebar from "./components/Sidebar.tsx";
import { Post } from "./components/Post.tsx";
import type { PostType } from "./components/Post.tsx";

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/oKelvinCosta.png",
      name: "Kelvin Costa",
      role: "Frontend / 2D Artist",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      { type: "link", content: "jane.design/doctorcare" },
    ],
    publishedAt: new Date("2022-05-11 08:13:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl:
        "https://images.unsplash.com/photo-1601823984263-b87b59798b70?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Diego Fernandes",
      role: "Frontend",
    },
    content: [
      { type: "paragraph", content: "Fala galera" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
    ],
    publishedAt: new Date("2022-05-11 08:13:00"),
  },
];

function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </main>
      </div>
    </>
  );
}

export default App;
