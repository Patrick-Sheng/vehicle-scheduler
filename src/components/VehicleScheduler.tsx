import { useState, useEffect } from 'react';
import { startOfWeek, addDays, format, isSameDay } from 'date-fns';
import { getVehicles, getBookings, addVehicle } from '../services/firestore';
import type { Vehicle, Booking } from '../types';
import './VehicleScheduler.css';

function VehicleScheduler() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [currentWeek]);

    const loadData = async () => {
        setLoading(true);
        try {
            const vehiclesData = await getVehicles();
            setVehicles(vehiclesData);

            const weekEnd = addDays(currentWeek, 7);
            const bookingsData = await getBookings(currentWeek, weekEnd);
            setBookings(bookingsData);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddVehicle = async () => {
        const name = prompt('Vehicle name:');
        if (name) {
            console.log('Add vehicle:', name);
            try {
                console.log('Calling addVehicle...');
                const id = await addVehicle({ name });
                console.log('Vehicle added with ID:', id);
                await loadData(); // Reload to show new vehicle
                console.log('Data reloaded');
            } catch (error) {
                console.error('Error adding vehicle:', error);
                alert('Failed to add vehicle: ' + error);
            }
        }
    };

    const getBookingForCell = (vehicleId: string, date: Date) => {
        return bookings.find(
            booking =>
                booking.vehicleId === vehicleId &&
                isSameDay(new Date(booking.startDate), date)
        );
    };

    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));

    const nextWeek = () => setCurrentWeek(addDays(currentWeek, 7));
    const prevWeek = () => setCurrentWeek(addDays(currentWeek, -7));
    const today = () => setCurrentWeek(startOfWeek(new Date()));

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (vehicles.length === 0) {
        return (
            <div className="no-vehicles">
                <h2>No Vehicles Yet</h2>
                <p>Add your first vehicle to get started!</p>
                <button onClick={handleAddVehicle}>
                    Add Vehicle
                </button>
            </div>
        );
    }

    return (
        <div className="vehicle-scheduler">
            {/* Week navigation */}
            <div className="week-navigation">
                <button onClick={prevWeek}>← Previous Week</button>
                <div className="week-info">
                    <button onClick={today}>Today</button>
                    <strong>
                        {format(currentWeek, 'MMM d')} - {format(addDays(currentWeek, 6), 'MMM d, yyyy')}
                    </strong>
                </div>
                <button onClick={nextWeek}>Next Week →</button>
            </div>

            {/* Calendar Grid */}
            <div className="calendar-grid">
                {/* Header row */}
                <div className="calendar-header">
                    Vehicles
                </div>
                {weekDays.map(day => (
                    <div key={day.toISOString()} className="calendar-day-header">
                        <div>{format(day, 'EEE')}</div>
                        <div>{format(day, 'MMM d')}</div>
                    </div>
                ))}

                {/* Vehicle rows */}
                {vehicles.map(vehicle => (
                    <div key={vehicle.id} style={{ display: 'contents' }}>
                        {/* Vehicle name cell */}
                        <div className="vehicle-name-cell">
                            {vehicle.name}
                        </div>

                        {/* Day cells */}
                        {weekDays.map(day => {
                            const booking = getBookingForCell(vehicle.id, day);
                            return (
                                <div
                                    key={day.toISOString()}
                                    className={`calendar-cell ${booking ? 'booked' : ''}`}
                                    onClick={() => {
                                        if (!booking) {
                                            const notes = prompt('Booking notes:');
                                            if (notes !== null) {
                                                console.log('Create booking for', vehicle.name, 'on', format(day, 'MMM d'));
                                            }
                                        }
                                    }}
                                >
                                    {booking && (
                                        <div className="booking-info">
                                            <div>{booking.userName}</div>
                                            {booking.notes && <div className="booking-notes">{booking.notes}</div>}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="calendar-legend">
                <p>💡 Click on any empty cell to create a booking</p>
                <p>🟢 Green cells = Booked</p>
            </div>
        </div>
    );
}

export default VehicleScheduler;