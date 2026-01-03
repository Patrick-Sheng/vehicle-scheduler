import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import './Login.css';

function Login() {
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log('Logged in as:', result.user.displayName);
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h1>🚗 Vehicle Scheduler</h1>
            <p>Sign in to book your family vehicles</p>
            <button
                className="google-signin-button"
                onClick={handleGoogleSignIn}
            >
                Sign in with Google
            </button>
        </div>
    );
}

export default Login;