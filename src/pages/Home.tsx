import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

interface HomeProps {
    user: {
        displayName: string | null;
        email: string | null;
    };
}

function Home({ user }: HomeProps) {
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log('Signed out successfully');
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <div>
                    <h1>Vehicle Scheduler</h1>
                    <p>Welcome, {user.displayName}!</p>
                </div>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>

            <div style={{
                padding: '40px',
                border: '2px dashed #ccc',
                borderRadius: '8px',
                textAlign: 'center'
            }}>
                <h2>🚗 Booking System Coming Soon</h2>
                <p>This is where you'll see the vehicle calendar</p>
            </div>
        </div>
    );
}

export default Home;