import styles from "@/styles/food/navbar.module.css";
import Image from "next/image";

const iconPath = `/img/icons`;

const IconButton = ({ title, iconName }) => (
  <button className={styles["icon-button"]}>
    <Image
      src={`${iconPath}/${iconName}.png`}
      width={20}
      height={25}
      alt=""
      style={{ margin: "0.5rem" }}
    />
    {title}
  </button>
);

const SearchBar = ({ search, setSearch }) => (
  <>
    <Image
      src={`${iconPath}/hand-lens.png`}
      width={25}
      height={25}
      alt=""
      style={{ position: "relative", left: "5rem" }}
    />
    <input
      type="text"
      className={styles["search-input"]}
      placeholder="¿Qué platillo necesitas?"
      value={search}
      onChange={() => {}}
    />
  </>
);

export default function Navbar({ foodNumber = 0 }) {
  return (
    <nav className={styles["nav-bar"]}>
      <span className={styles.title}>Platillos Guardados</span>
      <span className={styles.subtitle}>{foodNumber} platillos</span>
      {/*<SearchBar />
      <IconButton iconName={"filter"} title={"Filtrar"} />
  <IconButton iconName={"sort"} title={"Ordenar"} />*/}
    </nav>
  );
}
