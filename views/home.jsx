const { useNavigate } = ReactRouterDOM;

export function Home() {
  const navigate = useNavigate();

  function moveTo(ev, route) {
    ev.preventDefault();
    navigate(`/${route}`);
  }
  return (
    <section className="home">
      {/* <h1>Appsus</h1> */}
      <h2>Appsus - Your Personal Workspace</h2>
      <div className="apps">
        <div onClick={(ev) => moveTo(ev, "note")} className="keep">
          <img src="./assets/img/post-it.png" alt="" />
          <h1>Clear Your Thoughts</h1>
        </div>
        <div onClick={(ev) => moveTo(ev, "mail")} className="mail">
          <img src="./assets/img/inbox.png" alt="" />
          <h1>Write a Friend</h1>
        </div>
      </div>
    </section>
  );
}
