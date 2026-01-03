import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    getDocs,
    Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import type { Vehicle, Booking } from '../types';

// Vehicle functions
export const addVehicle = async (vehicle: Omit<Vehicle, 'id'>) => {
    const docRef = await addDoc(collection(db, 'vehicles'), vehicle);
    return docRef.id;
};

export const getVehicles = async (): Promise<Vehicle[]> => {
    const querySnapshot = await getDocs(collection(db, 'vehicles'));
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as Vehicle[];
};

export const deleteVehicle = async (vehicleId: string) => {
    await deleteDoc(doc(db, 'vehicles', vehicleId));
};

// Booking functions
export const addBooking = async (booking: Omit<Booking, 'id'>) => {
    const docRef = await addDoc(collection(db, 'bookings'), {
        ...booking,
        startDate: Timestamp.fromDate(booking.startDate),
        endDate: Timestamp.fromDate(booking.endDate)
    });
    return docRef.id;
};

export const getBookings = async (startDate: Date, endDate: Date): Promise<Booking[]> => {
    const q = query(
        collection(db, 'bookings'),
        where('startDate', '>=', Timestamp.fromDate(startDate)),
        where('startDate', '<=', Timestamp.fromDate(endDate))
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            vehicleId: data.vehicleId,
            userId: data.userId,
            userName: data.userName,
            startDate: data.startDate.toDate(),
            endDate: data.endDate.toDate(),
            notes: data.notes
        };
    }) as Booking[];
};

export const deleteBooking = async (bookingId: string) => {
    await deleteDoc(doc(db, 'bookings', bookingId));
};