import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="home glass">
      <h1>Welcome {user ? user.name : 'to MusicApp'}!</h1>
      <p>Discover music, listen to radio, and search for your favorite tracks and users.</p>
      {/* Music recommendations, radio, and search UI will go here */}
    </div>
  );
};

export default Home;
