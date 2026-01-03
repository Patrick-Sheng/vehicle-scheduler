import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import VehicleScheduler from '../components/VehicleScheduler';
import './Home.css';

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
        <div className="home-container">
            <div className="home-header">
                <div>
                    <h1>Vehicle Scheduler</h1>
                    <p>Welcome, {user.displayName}!</p>
                </div>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>

            <VehicleScheduler />
        </div>
    );
}

export default Home;