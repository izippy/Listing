# Listing Microservice

## CRUD Operations
*Serve static files*
`rooms/listing/:listingID`

*Description*

| CRUD    | METHOD  | ENDPOINT                               | ACTION                                      |
|:------- |:--------|:---------------------------------------|:--------------------------------------------|
| Create  | POST    | `/api/rooms/listing/desc/:listingID`   | Create new description for a listing        |
| Read    | GET     | `/api/rooms/listing/desc/:listingID`   | Read description for a listing              |
| Update  | PUT     | `/api/rooms/listing/desc/:listingID`   | Update description for a listing            |
| Update  | PATCH   | `/api/rooms/listing/desc/:listingID`   | Update part of a description for a listing  |
| Delete  | DELETE  | `/api/rooms/listing/desc/:listingID`   | Delete a description for a listing          |


*Amenity*

| CRUD    | METHOD  | ENDPOINT                               | ACTION                                   |
|:------- |:--------|:---------------------------------------|:-----------------------------------------|
| Create  | POST    | `/api/rooms/listing/amenity/:listingID`| Create new amenity for a listing         |
| Read    | GET     | `/api/rooms/listing/amenity/:listingID`| Read amenity for a listing               |
| Update  | PUT     | `/api/rooms/listing/amenity/:listingID`| Update amenity for a listing             |
| Update  | PATCH   | `/api/rooms/listing/amenity/:listingID`| Update part of amenity for a listing     |
| Delete  | DELETE  | `/api/rooms/listing/amenity/:listingID`| Delete amenity for a listing             |


