import { Outlet } from "react-router";
import Header from "../components/header/Header";
import { useState } from "react";

function AppLayout() {
  const [city, setCity] = useState(null);

  return (
    <>
      <Header
        onSetCity={setCity}
        city={city}
      />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
