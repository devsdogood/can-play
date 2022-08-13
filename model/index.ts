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
  mailchimp?: string;
  email?: string;
  phone_number?: string;
}

export interface PaymentInfo {
  payment_id: string;
  amount: any;
}

export interface Participant extends Person {
  address?: string;
  birth_date?: string;
  parent_guardian_id: string;
  grade?: string;
  transport_assistance?: string;
  emergency_contact: {
    name: string[];
    contact_info: {
      email?: Person["email"];
      phone_number?: Person["phone_number"];
      //require this.contact_info.email||this.contact_info.phone_number;
    };
  };
  notes?: string;
  attended: boolean;
}

export interface ParentGuardian extends Person {
  employer: string;
  address: string;
  payment_method: PaymentInfo;
  notes?: string;
}

export interface Coach extends Person {
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
  //attendance
  date: string;
  start_time: string;
  end_time: string;
  //basic info
  age?: number;
  parent_guardian_id?: string;
  //employment
  is_employed?: boolean;
  employer?: string;
  school?: string;
  //background
  background_check_date?: string;
  criminal_history?: string[];

  did_refuse_participation?: boolean;
  signed_waiver?: boolean;
  //emergency info
  emergency_contact?: {
    name: string[];
    contact_info: {
      email?: Person["email"];
      phone_number?: Person["phone_number"];
    };
  };
  notes?: string;
}

export type EventAttendance = {
  id: string;
  name?: Person["name"];
  attended?: boolean;
};

export interface Program {
  name: string;
  events: Event[];
  hosts?: Person[];
}

export interface Event {
  program_id?: string;
  name?: string;
  start_date?: string;
  end_date?: string;
  coaches: EventAttendance[];
  volunteers: EventAttendance[];
  participants: EventAttendance[];
}
