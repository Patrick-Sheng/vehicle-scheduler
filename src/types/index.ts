export interface Vehicle {
    id: string;
    name: string;
    color?: string;
    type?: string;
}

export interface Booking {
    id: string;
    vehicleId: string;
    userId: string;
    userName: string;
    startDate: Date;
    endDate: Date;
    notes?: string;
}