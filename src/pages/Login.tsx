import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';

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
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            gap: '20px'
        }}>
            <h1>Vehicle Scheduler</h1>
            <p>Sign in to book your family vehicles</p>
            <button
                onClick={handleGoogleSignIn}
                style={{
                    padding: '12px 24px',
                    fontSize: '16px',
                    backgroundColor: '#4285f4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Sign in with Google
            </button>
        </div>
    );
}

export default Login;