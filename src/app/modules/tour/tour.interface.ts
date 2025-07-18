import { Types } from "mongoose";

export interface ITourType {
    name: string;
}

export interface ITour {
    title: string;
    slug: string;
    description?: string;
    images?: string[];
    location?: string;
    costFrom?: number;
    startDate?: Date;
    departureLocation?: string;
    arrivalLocation?: string;
    endDate?: Date;
    // tour e ki ki subhida thakbe
    included?: string[];
    // tour e ki ki subhida thakbe na
    excluded?: string[];
    // tour e ki ki material dibe
    amenities?: string[];
    tourPlan?: string[];
    maxGuest?: number;
    minAge?: number;
    division: Types.ObjectId;
    tourType: Types.ObjectId;
}
