import { useLocation } from "react-router-dom";

function DummyPage() {
  const location = useLocation();

  return (
    <>
      <main>
        <h1>Dummy Page</h1>
        <section>
          <h2>location:</h2>
          <p>pathname: {location.pathname}</p>
          <p>seach: {location.search}</p>
        </section>
      </main>
    </>
  );
}

export { DummyPage };
