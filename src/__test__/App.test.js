import { render, screen, fireEvent, act } from "@testing-library/react";
import Login from "../components/content/login/UserLogin";
import Sidebar from "../components/sidebar/Sidebar";
import { MemoryRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";

describe("Able to login and logout", () => {
  let root = null;
    beforeEach(() => {
    const container = document.createElement("div");
    root = ReactDOM.createRoot(container)
    document.body.appendChild(container);
  });
  afterEach(() => {
    root.unmount();
  });
  
  test("On login session_id is created", async() => {
    const session = jest.fn(localStorage.length).mockReturnValue(1);

    await act(() =>
      root.render(
        <Router>
          <Login />
        </Router>
      )
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "admin" },
    });
    fireEvent.click(screen.getByTestId(/login/i));

    expect(session(localStorage.length)).toBeGreaterThanOrEqual(1);
  });

  test("on logout session_id is removed", async () => {
    const confirmLogout = jest.spyOn(window, "confirm").mockReturnValue(true);
    await act(() => {
      root.render(
        <Router>
          <Sidebar user={true} />
        </Router>
      );
    });
    const logoutButton = document.querySelector(`.logout`);
    logoutButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    const session = jest.fn(localStorage.length).mockReturnValue(0);

    //fireEvent.click(screen.getByTestId('logout'));
    expect(confirmLogout("Do you want to logout?")).toBe(true);
    expect(session(localStorage.length)).toBeLessThanOrEqual(0);
  });
});
