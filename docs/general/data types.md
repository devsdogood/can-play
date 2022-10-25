Table Of Contents
=================
|| description | External Location|
|-|-|-|
[Info](#info) | Info about this file
[`Person`](#person) | The `Person` interface | [index.ts](../../model/index.ts#L7)
[`Participant`](#participant) | The `Participant` interface | [index.ts](../../model/index.ts#L22)



**Info**
====

This file explains how the data is structured for the`interface`s and `type`s defined in [`model/index.ts`.](../../model/index.ts)  
This file does not explain how to access or modify the data/`interface`s and `type`s.  

*NOTE: This file is in the /general directory.
This is because although the file is primarily intended to be used in/by the backend, it still may be useful to have for the front end.*  

<!---cspell: ignore foldered -->
Footnotes will be added with the following characters and meanings:
|||
-|-
*|local footnote (within the same header)
†|footnote (within the same file)
‡|foldered footnote (within the same folder)
◊|global footnote (applies everywhere)
•|yoda quote


<br/><br/><br/>***May the Force be with you.*** •

`Person`
========
A `Person` represents a person.  


`Person` is an `interface`.  
It can be found [here](../../model/index.ts#L7)  
It is used as a superclass of [`Participant`](#Participant), [`ParentGuardian`](#ParentGuardian), [`Coach`](#Coach), and [`Volunteer`](#Volunteer).

Parameters
----------
Field             | Internal name     | Description                              | Type                            | Is optional
------------------|-------------------|------------------------------------------|---------------------------------|--------------------
Name              | name              | The name of the person                   | `string[first name, last name]` | no
T-Shirt Size      | tshirt_size       | The t-shirt size of the person           | `string`                        | yes
Food Restrictions | food_restrictions | Food restrictions for the person         | `string`                        | yes
Health Needs      | health_needs      | Health needs of the person               | `string`                        | yes
MailChimp         | mailchimp         | The mailchimp information for the person | `string`                        | yes[*](#person-fn1)
Email             | email             | The email address of the person          | `string`                        | yes[*](#person-fn1)
Phone             | phone             | The phone number of the person           | `string`                        | yes[*](#person-fn1)

### Footnotes
<style>h4{display: none;}</style>

#### person-fn1
<i>*`ParentGuardian` should require at least one contact information.</i><br/>

<Style>h4{display:normal;}</Style>

`Participant`
=============
A `Participant` represents a participant for an event.

`Participant` is an interface.  
It can be found [here](../../model/index.ts#L22).  
`Participant` extends `Person` meaning that it requires parameters from `Person`.  
Please refer to the documentation of [`Person`](#Person) for details.

Parameters
----------
Field | Internal name | Description | Type | Is optional
------|---------------|-------------|------|------------
Address | `address` | The home address of the participant | `string` | temp[†](#final-fn1)
Birth Date | `birth_date` | The date upon which the participant was born | `string` | temp[†](#final-fn1)
Parent/Guardian ID | `parent_guardian_id` | The UUID of the parent/guardian of the participant | `string` |no
Grade | `grade` | The grade of the participant | `string`|yes[*](#participant-fn1)
Transport Assistance | `transport_assistance` | Unknown[††](#final-fn2) | `string` | yes
Emergency Contact | `emergency_contact` | The emergency contact of the participant (in case of emergency) | `object`<br/><table><tr><th>Field</th><th>Internal Name</th><th>Description</th><th>Type</th><th>Is Optional</th></tr><tr><td>Name</td><td>`emergency_contact.name`</td><td>The name of the contact</td><td>`string[first name, last name]`</td><td>no</td></tr><tr><td>Contact Info</td><td>`emergency_contact.contact_info`</td><td>The contact information of the emergency contact</td><td>`object`<br/><table><tr><th>Field</th><th>Internal Name</th><th>Description</th><th>Type</th><th>Is Optional</th></tr><tr><td>Email</td><td>`emergency_contact.contact_info.email`</td><td>The email address of the contact</td><td>`string`</td><td>yes[**](#participant-fn2)</td></tr><tr><td>Phone Number</td><td>`emergency_contact.contact_info.phone_number`</td><td>The phone number of the contact</td><td>`string`</td><td>yes[**](#participant-fn2)</td></tr></table><td>no</td></table>
Notes | notes | Notes on the participant | `string` | yes


### Footnotes
<style>h4{display:none;}</style>

#### participant-fn1
<i>*Grade will be added later if applicable (not for participant setup)</i><br/>

#### participant-fn2
<i>**`emergency_contact.contact_info` should require at least one contact information.</i><br/>
<Style>h4{display:normal;}</Style>

`ParentGuardian`
================
A `ParentGuardian` represents a parent or guardian of a participant.

`ParentGuardian` is an interface.  
It can be found [here](../../model/index.ts#L40)  
`ParentGuardian` extends `Person` meaning that it requires parameters from `Person`.  
Please refer to the documentation of [`Person`](#person) for details.

Parameters
----------
| Field | Internal Name | Description | Type | Is Optional |
|-------|---------------|-------------|------|-------------|
Employer | `employer` | The employer of the parent/guardian | `string` | no
Address | `address` |The address at which the parent/guardian lives | `string` | no
Payment Method | `payment_method` | The way in which the parent/guardian pays | `PaymentInfo` | no
Notes | `notes` | Notes on the parent/guardian | `string` | yes

`Coach`
=======
A `Coach` represents a person that coaches at an event.

`Coach` is an interface.  
It can be found [here](../../model/index.ts#L47)  
`Coach` extends `Person` meaning that it requires parameters from `Person`.  
Please refer to the documentation of [`Person`](#person) for details.

Parameters
----------
| Field | Internal Name | Description | Type | Is Optional |
|-------|---------------|-------------|------|-------------|
Address | `address` | The address at which the coach lives. | `string` | no
Employer | `employer` | The employer of the coach. | `string` | yes[*](#coach-fn1)
School Attending | `school_attending` | The school that the coach attends. | `string` | yes[*](#coach-fn1)
Expertise | `expertise` | The expertise of the coach. (which sport the coach coaches) | `string` | temp[†](#final-fn1)
Date of Background Check | `date_of_background_check` | The date upon which the background of the coach was checked (for security reasons probably) | `string` | no
Training Date | `training_date` | The date upon which the coach was trained[††](#final-fn2) | `string` | no
Signed Job Description | `signed_job_desc` | Unknown[††](#final-fn2) | `string` | yes
Signed Handbook | `signed_handbook` | Unknown[††](#final-fn2) | `string` | yes
Payment Info | `payment_info` | The way in which the coach pays | `PaymentInfo` | yes
Notes | `notes` | Notes on the coach | `string` | yes

Footnotes
---------
<style>h4{display:none;}</style>

#### Coach-fn1
<i>*The coach should either be attending school or have a job.</i>
<Style>h4{display:normal;}</Style>

`Volunteer`
===========
A `Volunteer` represents a person who has volunteered at an event.

`Volunteer` is an interface.  
It can be found [here](../../model/index.ts#60).  
`Coach` extends `Person` meaning that it requires parameters from `Person`.  
Please refer to the documentation of [`Person`](#person) for details.

Parameters
----------
| Field | Internal Name | Description | Type | Is Optional |
|-------|---------------|-------------|------|-------------|
Date | `date` | The date upon which the volunteer will be attending. | string | no
Start Time | `start_time` | The time upon the specified date that the volunteer will begin attending. | `string` | no
End Time | `end_time` | The time upon the specified date that the volunteer will stop attending. | `string` | no
Age | `age` | The age of the volunteer. | `string` | yes
Parent/Guardian ID | `parent_guardian_id` | The UUID of the parent/guardian of the volunteer. | `string` | yes
Is Employed | `is_employed` | Weather the volunteer is employed. | `bool` | temp[†](#final-fn1)
Employer | `employer` | The employer of the volunteer. | `string` | yes[*](#volunteer-fn1)
School | `school` | The school of the volunteer. | `string` | yes
Background Check Date | `background_check_date` | The date that the background of the volunteer was checked. | `string` | yes
Criminal History | `criminal_history` | The history of the volunteer's criminal activity. | `string[]` | yes
Did Refuse Participation | `did_refuse_participation` | Whether or not the volunteer refused to participate in the event. | `bool` | yes
Signed Waver | `signed_waver` | Whether or not the volunteer signed a waver. | `bool` | yes
Emergency Contact | `emergency_contact` | The emergency contact of the participant (in case of emergency) | `object`<br/><table><tr><th>Field</th><th>Internal Name</th><th>Description</th><th>Type</th><th>Is Optional</th></tr><tr><td>Name</td><td>`emergency_contact.name`</td><td>The name of the contact.</td><td>`string[first name, last name]`</td><td>no</td></tr><tr><td>Contact Info</td><td>`emergency_contact.contact_info`</td><td>The contact information of the emergency contact.</td><td>`object`<br/><table><tr><th>Field</th><th>Internal Name</th><th>Description</th><th>Type</th><th>Is Optional</th></tr><tr><td>Email</td><td>`emergency_contact.contact_info.email`</td><td>The email address of the contact.</td><td>`string`</td><td>yes[**](#volunteer-fn2)</td></tr><tr><td>Phone Number</td><td>`emergency_contact.contact_info.phone_number`</td><td>The phone number of the contact.</td><td>`string`</td><td>yes[**](#volunteer-fn2)</td></tr></table><td>no</td></table>| yes
Notes | `notes` | Notes on the volunteer. | `string` | yes

Footnotes
---------
<style>h4{display:none;}</style>

#### volunteer-fn1
<i>*If the volunteer is employed then the employer should be known.</i><br/>

#### volunteer-fn2
<i>**The volunteer's emergency contact should either have an email of a phone number.</i>
<Style>h4{display:normal;}</Style>

# Final Footnotes
<style>h3{display: none;}</style><br/>

### final-fn1
*†`temp` means that the value is optional but may be required later.*<br/>
### final-fn2
*††When creating this document there was not enough information to fully understand the use of some parameters.*

<style>h3{display: normal;}</style>