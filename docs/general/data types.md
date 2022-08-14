**Info**
====

This file explains how the data is structured for the`interface`s and `type`s in `model/index.ts`.  
This file does not explain how to access or modify the data/`interface`s and `type`s.  

*NOTE: This file is in the /general directory.
This is because although the file is primarily intended to be used in/by the backend, it still may be useful to have for the front end.*  

***May the Force be with you.***

`Person`
========
A `Person` represents a person.

`Person` is an `interface`.
It is used as a superclass of `Participant`, `ParentGuardian`, `Coach`, and `Volunteer`.

parameters
----------
Field | Internal name | Discription | Type | Is optional
------|---------------|-------------|------|------------
Name | name | The name of the person to be created | `string[first name, last name]` | no
T-Shirt Size | tshirt_size | The t-shirt size of the person | `string` | yes
Food Restrictions | food_restrictions | Food restrictions for the person | `string` | yes
Health Needs | health_needs | Health needs of the person | `string` | yes
MailChimp | mailchimp | The mailchimp information for the person | `string` | yes*
Email | email | The email address of the person | `string` | yes*
Phone | phone | The phone number of the person | `string` | yes*

<i>*`ParentGuardian` should require at least one contact information.</i>

