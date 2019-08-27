# Description & Amenities
System design of microservice for vacation rental description and amenities

## Tech Stack
* Backend: Node.js, Express, AWS EC2, Nginx
* Database: PostgreSQL, Cassandra
* Stress Testing: K6, Loader.io, New Relic

## API
Description:

| HTTP METHOD  | ENDPOINT                          | ACTION                                      |
|:--------|:---------------------------------------|:--------------------------------------------|
| POST    | `/api/rooms/listing/desc/:listingID`   | Create new description for a listing        |
| GET     | `/api/rooms/listing/desc/:listingID`   | Read description for a listing              |
| PUT     | `/api/rooms/listing/desc/:listingID`   | Update description for a listing            |
| PATCH   | `/api/rooms/listing/desc/:listingID`   | Update part of a description for a listing  |
| DELETE  | `/api/rooms/listing/desc/:listingID`   | Delete a description for a listing          |


Amenity:

| HTTP METHOD  | ENDPOINT                          | ACTION                                   |
|:--------|:---------------------------------------|:-----------------------------------------|
| POST    | `/api/rooms/listing/amenity/:listingID`| Create new amenity for a listing         |
| GET     | `/api/rooms/listing/amenity/:listingID`| Read amenity for a listing               |
| PUT     | `/api/rooms/listing/amenity/:listingID`| Update amenity for a listing             |
| PATCH   | `/api/rooms/listing/amenity/:listingID`| Update part of amenity for a listing     |
| DELETE  | `/api/rooms/listing/amenity/:listingID`| Delete amenity for a listing             |

## Usage
Within root directory:

```
# install dependencies
npm install

# seed database
npm run db
npm run seed

# build webpack bundle
npm run build

# run the app
npm start
```

## Related Projects
* https://github.com/izippy/PhotoCarousel
* https://github.com/izippy/Reservations
