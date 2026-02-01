import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Logo, LogoutBtn } from "../index.js";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "../ThemeToggle.jsx";

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  // redirect when auth changes
  useEffect(() => {
    if (authStatus) {
      navigate("/all-posts");
    }
  }, [authStatus]);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="py-3 shadow bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors">
      <Container>
        <nav className="flex items-center">
          <div className="mr-4">
            <Link to="/">
              <Logo width="100px" />
            </Link>
          </div>

          <ul className="flex ml-auto items-center space-x-2">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-block px-4 py-2 rounded-full transition bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}

            {/* Theme Toggle */}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
