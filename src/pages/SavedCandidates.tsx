import { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface'

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const getCandidates = () => {
    const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates")) || [];
    setCandidates(savedCandidates)
  }

  useEffect(() => {
    getCandidates();
  }, []);

  return (
    <>
      <h1 className="mb-3 text-center">Potential Candidates</h1>
      {candidates.length != 0 ? (
      <table className="table table-dark container">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Location</th>
            <th scope="col">Email</th>
            <th scope="col">Company</th>
            <th scope="col">Bio</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={index}>
              <td>
                <img src={candidate.profileImage}></img>
              </td>
              <td>{candidate.username}</td>
              <td>{candidate.location}</td>
              <td>{candidate.email}</td>
              <td>{candidate.company}</td>
              <td>{candidate.bio}</td>
            </tr>
          ))
          }
        </tbody>
      </table>
      ) : (
        <h2>
          There are no potential candidates...
        </h2>
      )
      }
    </>
  );
};

export default SavedCandidates;
