import Card from "../../components/Card/Card";
import css from "./CardsList.module.css";

export default function CardsList({ teachers }) {
  return (
    <ul className={css.container}>
      {teachers.map((teacher) => (
        <li key={teacher._id}>
          <Card teacher={teacher} />
        </li>
      ))}
    </ul>
  );
}
