import type { Flight } from '../data/dummyData';
import { dummyFlights } from '../data/dummyData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const flightAPI = {
  // Get all flights
  getAllFlights: async (): Promise<Flight[]> => {
    await delay(800);
    return [...dummyFlights];
  },

  // Get flight by ID
  getFlightById: async (id: number): Promise<Flight | null> => {
    await delay(500);
    return dummyFlights.find(flight => flight.id === id) || null;
  },

  // Create new flight
  createFlight: async (flight: Omit<Flight, 'id'>): Promise<Flight> => {
    await delay(1000);
    const newFlight: Flight = {
      ...flight,
      id: Math.max(...dummyFlights.map(f => f.id)) + 1
    };
    dummyFlights.push(newFlight);
    return newFlight;
  },

  // Update flight
  updateFlight: async (id: number, updatedFlight: Partial<Flight>): Promise<Flight | null> => {
    await delay(800);
    const index = dummyFlights.findIndex(flight => flight.id === id);
    if (index !== -1) {
      dummyFlights[index] = { ...dummyFlights[index], ...updatedFlight };
      return dummyFlights[index];
    }
    return null;
  },

  // Delete flight
  deleteFlight: async (id: number): Promise<boolean> => {
    await delay(600);
    const index = dummyFlights.findIndex(flight => flight.id === id);
    if (index !== -1) {
      dummyFlights.splice(index, 1);
      return true;
    }
    return false;
  }
};
