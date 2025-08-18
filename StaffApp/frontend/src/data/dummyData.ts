// Dummy data for the Airline Management System

export interface User {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'staff';
  email: string;
}

export interface Flight {
  id: number;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  capacity: number;
  bookedSeats: number;
  price: number;
  status: 'scheduled' | 'delayed' | 'cancelled' | 'completed';
}

export interface Route {
  id: number;
  routeCode: string;
  origin: string;
  destination: string;
  distance: number;
  estimatedDuration: string;
  status: 'active' | 'inactive';
}

export interface Passenger {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passportNumber: string;
  nationality: string;
  dateOfBirth: string;
  bookings: number[];
}

export interface Booking {
  id: number;
  passengerId: number;
  flightId: number;
  bookingDate: string;
  seatNumber: string;
  status: 'confirmed' | 'cancelled' | 'pending';
  totalAmount: number;
}

// Dummy users data
export const dummyUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    email: 'admin@airline.com'
  },
  {
    id: 2,
    username: 'staff',
    password: 'staff123',
    role: 'staff',
    email: 'staff@airline.com'
  }
];

// Dummy flights data
export const dummyFlights: Flight[] = [
  {
    id: 1,
    flightNumber: 'AI101',
    origin: 'New York',
    destination: 'London',
    departureTime: '2024-08-20 14:30',
    arrivalTime: '2024-08-21 02:30',
    capacity: 180,
    bookedSeats: 145,
    price: 850,
    status: 'scheduled'
  },
  {
    id: 2,
    flightNumber: 'AI102',
    origin: 'London',
    destination: 'Paris',
    departureTime: '2024-08-20 16:00',
    arrivalTime: '2024-08-20 18:30',
    capacity: 150,
    bookedSeats: 120,
    price: 420,
    status: 'scheduled'
  },
  {
    id: 3,
    flightNumber: 'AI103',
    origin: 'Mumbai',
    destination: 'Dubai',
    departureTime: '2024-08-20 09:15',
    arrivalTime: '2024-08-20 11:45',
    capacity: 200,
    bookedSeats: 180,
    price: 650,
    status: 'delayed'
  }
];

// Dummy routes data
export const dummyRoutes: Route[] = [
  {
    id: 1,
    routeCode: 'NYC-LON',
    origin: 'New York',
    destination: 'London',
    distance: 5585,
    estimatedDuration: '8h 00m',
    status: 'active'
  },
  {
    id: 2,
    routeCode: 'LON-PAR',
    origin: 'London',
    destination: 'Paris',
    distance: 344,
    estimatedDuration: '1h 30m',
    status: 'active'
  },
  {
    id: 3,
    routeCode: 'BOM-DXB',
    origin: 'Mumbai',
    destination: 'Dubai',
    distance: 1927,
    estimatedDuration: '2h 30m',
    status: 'active'
  }
];

// Dummy passengers data
export const dummyPassengers: Passenger[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1234567890',
    passportNumber: 'P123456789',
    nationality: 'American',
    dateOfBirth: '1985-03-15',
    bookings: [1, 3]
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@email.com',
    phone: '+1987654321',
    passportNumber: 'P987654321',
    nationality: 'British',
    dateOfBirth: '1990-07-22',
    bookings: [2]
  },
  {
    id: 3,
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@email.com',
    phone: '+1122334455',
    passportNumber: 'P112233445',
    nationality: 'Canadian',
    dateOfBirth: '1988-11-08',
    bookings: []
  }
];

// Dummy bookings data
export const dummyBookings: Booking[] = [
  {
    id: 1,
    passengerId: 1,
    flightId: 1,
    bookingDate: '2024-08-15',
    seatNumber: '12A',
    status: 'confirmed',
    totalAmount: 850
  },
  {
    id: 2,
    passengerId: 2,
    flightId: 2,
    bookingDate: '2024-08-16',
    seatNumber: '8C',
    status: 'confirmed',
    totalAmount: 420
  },
  {
    id: 3,
    passengerId: 1,
    flightId: 3,
    bookingDate: '2024-08-17',
    seatNumber: '15B',
    status: 'pending',
    totalAmount: 650
  }
];
