export function About() {
  return (
    <section className="about">
      <div className="authors">
        <div className="alon">
          <img src="./assets/img/authors/alon.jpg" alt="" />
          <h1 className="about-name">Alon Mlievski</h1>
          <h2 className="about-title">Full Stack Developer</h2>
          <h4 className="about-desc">Coding Academy student</h4>
          <h4 className="about-desc">Based in Tel Aviv</h4>
          <div className="portfolio-links">
            <a href="https://github.com/SuperDuperAlon">
              <i class="fa-brands fa-square-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/alon-mlievski-6756aa74/">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>
        <div className="noah">
          <img src="./assets/img/authors/noah.jpeg" alt="" />
          <h1 className="about-name">Noah Markovich</h1>
          <h2 className="about-title">Full Stack Developer</h2>
          <h4 className="about-desc">Coding Academy student</h4>
          <h4 className="about-desc">Based in Tel Aviv</h4>
          <div className="portfolio-links">
            <a href="https://github.com/Noahmarkovich">
              <i class="fa-brands fa-square-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/noah-markovich-956a42201/">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
