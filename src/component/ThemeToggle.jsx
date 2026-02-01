import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeSlice";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="bg-gray-700 dark:bg-gray-200 text-gray-100 dark:text-gray-900 hover:bg-gray-600 dark:hover:bg-gray-300 px-3 py-2 rounded-full transition"
    >
      {mode === "dark" ? "☀" : "🌙"}
    </button>
  );
}
