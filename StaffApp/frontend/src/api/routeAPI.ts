import type { Route } from '../data/dummyData';
import { dummyRoutes } from '../data/dummyData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const routeAPI = {
  // Get all routes
  getAllRoutes: async (): Promise<Route[]> => {
    await delay(800);
    return [...dummyRoutes];
  },

  // Get route by ID
  getRouteById: async (id: number): Promise<Route | null> => {
    await delay(500);
    return dummyRoutes.find(route => route.id === id) || null;
  },

  // Create new route
  createRoute: async (route: Omit<Route, 'id'>): Promise<Route> => {
    await delay(1000);
    const newRoute: Route = {
      ...route,
      id: Math.max(...dummyRoutes.map(r => r.id)) + 1
    };
    dummyRoutes.push(newRoute);
    return newRoute;
  },

  // Update route
  updateRoute: async (id: number, updatedRoute: Partial<Route>): Promise<Route | null> => {
    await delay(800);
    const index = dummyRoutes.findIndex(route => route.id === id);
    if (index !== -1) {
      dummyRoutes[index] = { ...dummyRoutes[index], ...updatedRoute };
      return dummyRoutes[index];
    }
    return null;
  },

  // Delete route
  deleteRoute: async (id: number): Promise<boolean> => {
    await delay(600);
    const index = dummyRoutes.findIndex(route => route.id === id);
    if (index !== -1) {
      dummyRoutes.splice(index, 1);
      return true;
    }
    return false;
  }
};
