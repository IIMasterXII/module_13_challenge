import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface'

const CandidateSearch = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [currentUser, setUser] = useState<Candidate | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchRandomUsers = async () => {
    try {
      const data = await searchGithub();
      setUsers(data);
      setCurrentIndex(0);
      nextUser()
    } catch (err) {
      console.log('Error')
    }
  };

  useEffect(() => {
    fetchRandomUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      fetchUserDetails(users[0].login);
    }
  }, [users]);

  const fetchUserDetails = async (login: string) => {
    try {
      const data = await searchGithubUser(login);
      const candidateData: Candidate = {profileImage: data.avatar_url, username: data.login, location: data.location, email: data.email, company: data.company, bio: data.bio}
      setUser(candidateData);
    } catch (err) {
      console.error("Failed to fetch user details.");
    }
  };

  const nextUser = () => {
    console.log(currentIndex)
    if (users.length === 0) return;
    if((currentIndex + 1) >= users.length){
      setCurrentIndex(currentIndex + 1);
      return
    }
    
    const nextIndex = (currentIndex + 1) % users.length;
    setCurrentIndex(nextIndex);
    fetchUserDetails(users[nextIndex].login);
  };

  const approveCandidate = () => {
    // Save current user's login to local storage
    const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || '{}');
    savedCandidates.push(currentUser);
    localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
    nextUser();
  }

  return (
    <>
      <h1 className="mb-3 text-center">CandidateSearch</h1>
      {currentUser ? (
      currentIndex < users.length ? (
        <div>
          <div className="card card-width text-bg-dark mb-3">
            <img src={currentUser.profileImage} className="card-img-top" alt="github-profile-pic"></img>
            <div className="card-body">
              <h2 className="card-title">{currentUser.username}</h2>
              <p className="card-text">Location: {currentUser.location ? currentUser.location : "None"}</p>
              <p className="card-text">Email: {currentUser.email ? currentUser.email : "None"}</p>
              <p className="card-text">Company: {currentUser.company ? currentUser.company : "None"}</p>
              <p className="card-text">Bio: {currentUser.bio ? currentUser.bio : "None"}</p>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <button className="fs-3 btn btn-danger"
              onClick={() => {
                nextUser()
              }} 
            >
              -
            </button>
            <button className="fs-3 btn btn-success"
              onClick={() => {
                approveCandidate()
              }} 
            >
              +
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2>No more candidates...</h2>
        </div>
      )
    ): (
      <div></div>
    )}
    </>
  );
};

export default CandidateSearch;
