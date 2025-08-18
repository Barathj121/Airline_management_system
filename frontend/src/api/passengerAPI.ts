import type { Passenger } from '../data/dummyData';
import { dummyPassengers } from '../data/dummyData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const passengerAPI = {
  // Get all passengers
  getAllPassengers: async (): Promise<Passenger[]> => {
    await delay(800);
    return [...dummyPassengers];
  },

  // Get passenger by ID
  getPassengerById: async (id: number): Promise<Passenger | null> => {
    await delay(500);
    return dummyPassengers.find(passenger => passenger.id === id) || null;
  },

  // Create new passenger
  createPassenger: async (passenger: Omit<Passenger, 'id'>): Promise<Passenger> => {
    await delay(1000);
    const newPassenger: Passenger = {
      ...passenger,
      id: Math.max(...dummyPassengers.map(p => p.id)) + 1
    };
    dummyPassengers.push(newPassenger);
    return newPassenger;
  },

  // Update passenger
  updatePassenger: async (id: number, updatedPassenger: Partial<Passenger>): Promise<Passenger | null> => {
    await delay(800);
    const index = dummyPassengers.findIndex(passenger => passenger.id === id);
    if (index !== -1) {
      dummyPassengers[index] = { ...dummyPassengers[index], ...updatedPassenger };
      return dummyPassengers[index];
    }
    return null;
  },

  // Delete passenger
  deletePassenger: async (id: number): Promise<boolean> => {
    await delay(600);
    const index = dummyPassengers.findIndex(passenger => passenger.id === id);
    if (index !== -1) {
      dummyPassengers.splice(index, 1);
      return true;
    }
    return false;
  },

  // Search passengers by name or email
  searchPassengers: async (query: string): Promise<Passenger[]> => {
    await delay(600);
    const lowercaseQuery = query.toLowerCase();
    return dummyPassengers.filter(passenger => 
      passenger.firstName.toLowerCase().includes(lowercaseQuery) ||
      passenger.lastName.toLowerCase().includes(lowercaseQuery) ||
      passenger.email.toLowerCase().includes(lowercaseQuery)
    );
  }
};
