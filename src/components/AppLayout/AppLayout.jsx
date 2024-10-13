import css from "./AppLayout.module.css";

export default function AppLayout({ children }) {
  return <div className={css.container}>{children}</div>;
}
