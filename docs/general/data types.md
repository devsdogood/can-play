**Info**
====

This file explains how the data is structured for the`interface`s and `type`s defined in [`model/index.ts`.](../../model/index.ts)  
This file does not explain how to access or modify the data/`interface`s and `type`s.  

*NOTE: This file is in the /general directory.
This is because although the file is primarily intended to be used in/by the backend, it still may be useful to have for the front end.*  

***May the Force be with you.***

`Person`
========
A `Person` represents a person.  


`Person` is an `interface`.  
It can be found [here](../../model/index.ts#L7)  
It is used as a superclass of [`Participant`](#Participant), [`ParentGuardian`](#Parent-Guardian), [`Coach`](#Coach), and [`Volunteer`](#Volunteer).

parameters
----------
Field | Internal name | Description | Type | Is optional
------|---------------|-------------|------|------------
Name | name | The name of the person to be created | `string[first name, last name]` | no
T-Shirt Size | tshirt_size | The t-shirt size of the person | `string` | yes
Food Restrictions | food_restrictions | Food restrictions for the person | `string` | yes
Health Needs | health_needs | Health needs of the person | `string` | yes
MailChimp | mailchimp | The mailchimp information for the person | `string` | yes[*](#person:fn1)
Email | email | The email address of the person | `string` | yes[*](#person:fn1)
Phone | phone | The phone number of the person | `string` | yes[*](#person:fn1)

### Footnotes
<style>h4{display: none;}</style>

#### person:fn1
<i>*`ParentGuardian` should require at least one contact information.</i><br/>

<Style>h4,p{display:normal;}/*reset*/</Style>

`Participant`
=============
A `Participant` represents a participant for an event.

`Participant` is an interface.  
It can be found [here](../../model/index.ts#L22).  
`Participant` extends `Person` meaning that it requires parameters from `Person`.  
Please refer to the documentation of [`Person`](#Person) for details.

parameters
----------
Field | Internal name | Description | Type | Is optional
------|---------------|-------------|------|------------
Address | `address` | The home address of the participant | `string` | temp[†](#final:fn1)
Birth Date | `birth_date` | The date upon which the participant was born | `string` | temp[†](#final:fn1)
Parent/Guardian ID | `parent_guardian_id` | The UUID of the parent/guardian of the participant | `string`|no
Grade | `grade` | The grade of the participant | `string`|yes[*](#participant:fn1)
Transport Assistance | `transport_assistance` | Unknown[††](#final:fn2) | `string` | yes
Emergency Contact | `emergency_contact` | The emergency contact of the participant (in case of emergency) | `object`<br/><table><tr><th>Field</th><th>Internal Name</th><th>Description</th><th>Type</th><th>Is Optional</th></tr><tr><td>Name</td><td>`emergency_contact.name`</td><td>The name of the contact</td><td>`string[first name, last name]`</td><td>no</td></tr><tr><td>Contact Info</td><td>`emergency_contact.contact_info`</td><td>The contact information of the emergency contact</td><td>`object`<br/><table><tr><th>Field</th><th>Internal Name</th><th>Description</th><th>Type</th><th>Is Optional</th></tr><tr><td>Email</td><td>`emergency_contact.contact_info.email`</td><td>The email address of the contact</td><td>[`Person["email"]`](#L30)</td><td>yes[***](#participant:fn3)</td></tr><tr><td>Phone Number</td><td>`emergency_contact.contact_info.phone_number`</td><td>The phone number of the contact</td><td>[`Person["phone_number"]`](#L31)</td><td>yes[**](#participant:fn2)</td></tr></table></table>
Notes | notes | Notes on the participant | `string` | yes


### Footnotes
<style>h4{display:none;}</style>

#### participant:fn1
<i>*Grade will be added later if applicable (not for participant setup)</i><br/>

#### participant:fn2
<i>**`emergency_contact.contact_info` should require at least one contact information.</i><br/>
<Style>h4{display:normal;}</Style>




# Final Footnotes
<style>h3{display: none;}</style><br/>

### final:fn1
*†`temp` means that the value is optional but may be required later.*<br/>
### final:fn2
*††When creating this document there was not enough information to fully understand the use of some parameters.*

<style>h3{display: normal;}</style>