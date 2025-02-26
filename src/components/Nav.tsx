import { useState } from "react";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  const [menu, setMenu] = useState("home");

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
          <div className="navbar-nav">
            {menu === "home" ? (<a href="/" className="nav-link active">Home</a>) : (<a onClick = {() => {setMenu("home")}} href="/" className="nav-link">Home</a>)}
            {menu === "candidates" ? (<a href="/SavedCandidates" className="nav-link active">Candidates</a>) : (<a onClick = {() => {setMenu("candidates")}} href="/SavedCandidates" className="nav-link">Candidates</a>)}
          </div>
      </div>
    </nav>
  )
};

export default Nav;
