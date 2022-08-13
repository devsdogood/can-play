import { ObjectId } from "mongodb";

export interface EventRegistration {
  event: Event;
  participant: Participant;
  parent_guardian: ParentGuardian;
}

export interface Person {
  name: string[];
  tshirt_size?: string;
  food_restrictions?: string;
  health_needs?: string;
}

export interface PaymentInfo {
  payment_id: string;
  amount: any;
}

export interface Participant extends Person {
  age?: number;
  address?: string;
  birth_date?: string;
  parent_guardian_id: string;
  grade?: string;
  transport_assistance?: string;
  emergency_contact: {
    name: string[];
    info: string[];
  };
  notes?: string;
}

export interface ParentGuardian extends Person {
  contact_info: string[];
  employer: string;
  address: string;
  payment_method: PaymentInfo;
  notes?: string;
}

export interface Coach extends Person {
  contact_info: string[];
  address: string;
  employer: string;
  school_attending: string;
  expertise: string; // Sport in which the coach, coaches. e.g. Basketball
  date_of_background_check: string;
  training_date: string;
  signed_job_desc: string;
  signed_handbook: string;
  payment_info: PaymentInfo;
  notes?: string;
}

export interface Volunteer extends Person {
  age: number;
  contact_info: string[];
  parent_guardian_id?: string;
  attended: boolean; //?Did attend
  is_employed: boolean;
  employer?: string;
  background_check_date?: string;
  school?: string;
  criminal_history?: string[];
  did_refuse_participation: boolean;
  signed_waiver: boolean;
  emergency_contact?: {
    name: string[];
    info: string[];
  };
  notes?: string;
}

type EventCoach = Pick<Coach, "name"> & { id: string };
type EventParticipant = Pick<Participant, "name"> & { id: string };
type EventVolunteer = Pick<Volunteer, "name"> & { id: string };

export interface Event {
  name: string;
  coaches: EventCoach[];
  participants: EventParticipant[];
  volunteers: EventVolunteer[];
  details: Record<string, string>;
}
