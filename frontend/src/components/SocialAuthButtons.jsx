import { FaGoogle, FaApple, FaFacebook, FaTwitter } from 'react-icons/fa';
import './SocialAuthButtons.css';

const SocialAuthButtons = () => (
  <div className="social-auth-btns">
    <button className="social-btn" title="Google"><FaGoogle /></button>
    <button className="social-btn" title="Apple"><FaApple /></button>
    <button className="social-btn" title="Facebook"><FaFacebook /></button>
    <button className="social-btn" title="Twitter"><FaTwitter /></button>
  </div>
);

export default SocialAuthButtons;
