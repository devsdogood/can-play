PROGRAM
=======
A program is a group of events (eg. 8th Grade Soccer).

info|doc|is optional|type
-|-|-|-
NAME|the name of the program|no|string
EVENTS|the events that will take place|temp|[UUID]
HOSTS|who is hosting the event|yes


EVENT
=====
An event is where people meet.
info|doc|is optional|type
-|-|-|-
NAME|The name of the event|no
PROGRAM ID|The id of the program in which this event is contained|yes
START DATE|The date upon which this event starts|temp
END DATE|The date upon which this event ends|temp
COACHES|The coaches who will be at the event|no
VOLUNTEERS|The volunteers who will be at the event|no
PARTICIPANTS|The children who participated in the event | no

COACH
=====
A coach coaches at an event.
info|doc|is optional
-|-|-
NAME|The coach's name|no
ADDRESS|Where the coach lives|no
EMPLOYER|Who the coach works for|no
SCHOOL ATTENDING|Where the coach goes to school|yes
```
 address: string;
  employer?: string;
  school_attending?: string;
  expertise?: string; // Sport in which the coach, coaches. e.g. Basketball
  date_of_background_check: string;
  training_date: string;
  signed_job_desc?: string;
  signed_handbook?: string;
  payment_info?: PaymentInfo;
  notes?: string;
  ```

PARTICIPANT
=====
info|doc|is op
-|-|-
NAME | The participants name | no
BIRTH DATE | The day the participant was born | no
GRADE | The grade in school the participant is in| no
T-SHIRT SIZE | The size of t-shirt the participant wears | no
