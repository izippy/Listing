-- drop db
DROP DATABASE IF EXISTS izippy;

-- create db
CREATE DATABASE izippy;

-- use or connect to db
\CONNECT izippy;

-- drop all tables
DROP TABLE desc;

-- create table one at a time
CREATE TABLE desc (
  id INT NOT NULL PRIMARY KEY,
  general TEXT NOT NULL,
  thespace TEXT NOT NULL,
  guestaccess TEXT NOT NULL,
  interactionwithguests TEXT NOT NULL,
  otherthingstonote TEXT NOT NULL,
  license VARCHAR(15) NOT NULL,
)

-- copy over csv data to table, one at at a time
-- COPY desc FROM './cookiemonster2' DELIMITER '|';

-- ADD FOREIGN KEYS AFTER ALL TABLES CREATED
-- join_listing_amenities TO listingsid
ALTER TABLE joinListingsAmenities
DROP CONSTRAINT IF EXISTS fk_joinListingsAmenities_listings;

ALTER TABLE joinListingsAmenities
ADD CONSTRAINT fk_joinListingsAmenities_listings
FOREIGN KEY (listings_id)
REFERENCES listings (id)
ON DELETE CASCADE;

-- listings.user_id TO usersid
ALTER TABLE listings
DROP CONSTRAINT IF EXISTS fk_listings_users;

ALTER TABLE listings
ADD CONSTRAINT fk_listings_users
FOREIGN KEY (users_id)
REFERENCES users (id)
ON DELETE CASCADE;

-- listings.type TO unit_typesid
ALTER TABLE listings
DROP CONSTRAINT IF EXISTS fk_listings_unittypes;

ALTER TABLE listings
ADD CONSTRAINT fk_listings_unittypes
FOREIGN KEY (unittype)
REFERENCES unittypes (id)
ON DELETE CASCADE;

-- join_listing_highlights.listing_id TO listingsid
ALTER TABLE joinListingsHighlights
DROP CONSTRAINT IF EXISTS fk_joinListingsHighlights_listings;

ALTER TABLE joinListingsHighlights
ADD CONSTRAINT fk_joinListingsHighlights_listings
FOREIGN KEY (listings_id)
REFERENCES listings (id)
ON DELETE CASCADE;

-- joinListingsHighlights.highlights_id TO highlights.id
ALTER TABLE joinlistingshighlights
DROP CONSTRAINT IF EXISTS fk_joinlistingshighlights_highlights;

ALTER TABLE joinlistingshighlights
ADD CONSTRAINT fk_joinlistingshighlights_highlights
FOREIGN KEY (highlights_id)
REFERENCES highlights (id)
ON DELETE CASCADE;

-- join_listings_amenities.amenities_id TO amenities.id
ALTER TABLE joinlistingsamenities
DROP CONSTRAINT IF EXISTS fk_joinlistingsamenities_amenities;

ALTER TABLE joinlistingsamenities
ADD CONSTRAINT fk_joinlistingsamenities_amenities
FOREIGN KEY (amenities_id)
REFERENCES amenities (id)
ON DELETE CASCADE;

-- amenities.amencatid TO amencatid
ALTER TABLE amenities
DROP CONSTRAINT IF EXISTS fk_amenities_amenitiescategories;

ALTER TABLE amenities
ADD CONSTRAINT fk_amenities_amenitiescategories
FOREIGN KEY (amen_cat_id)
REFERENCES amenitiescategories (id)
ON DELETE CASCADE;

-- db queries
| CRUD    | METHOD  | ENDPOINT                               | ACTION                                      |
|:------- |:--------|:---------------------------------------|:--------------------------------------------|
| Create  | POST    | `/api/rooms/listing/desc/:listingID`   | Create new description for a listing        |x
| Read    | GET     | `/api/rooms/listing/desc/:listingID`   | Read description for a listing              |
| Update  | PUT     | `/api/rooms/listing/desc/:listingID`   | Update description for a listing            |
| Update  | PATCH   | `/api/rooms/listing/desc/:listingID`   | Update part of a description for a listing  |
| Delete  | DELETE  | `/api/rooms/listing/desc/:listingID`   | Delete a description for a listing          |

-- Verify that all queries used by your API will run in under 50ms. To achieve this goal, you may need to do some performance tuning work on your DBMS.
-- Confirm performance by running the queries used by your API either by:
-- Writing tests (using/modifying existing tests is ok)
-- Using the DB console to execute and time queries

-- Notes:
-- Craft your queries to use records that are within the last 10% of your dataset.
-- Your queries should be the same queries you would use to support your API. Benchmarking a query that your service wouldn't use isn't helpful to determining performance.
-- Queries will be different depending on the technology in use.
-- 50ms is the upper limit. Most queries for this project should be optimizable to around 10ms or less. 
-- While most queries for this project can be optimized to execute in significantly less than 50ms, there may be very legitimate reasons why this goal might not be reachable in your circumstance.

-- Core queries: GET description and GET amenities for all listings
-- SELECT * FROM listings WHERE id = 14;
-- SELECT l.id, a.name, ac.category, la.offers, la.additional_info FROM listings l JOIN listings_amenities la ON la.listings_id = l.id 
-- JOIN amenities a ON a.id = la.amenities_id JOIN amenities_categories ac ON ac.id = a.amenities_categories_id WHERE l.id = 205;

--                    List of relations
 Schema |          Name          | Type  |     Owner     
--------+------------------------+-------+---------------
 public | amenities              | table | cassandratong
 public | amenitiescategories    | table | cassandratong
 public | highlights             | table | cassandratong
 public | joinlistingsamenities  | table | cassandratong
 public | joinlistingshighlights | table | cassandratong
 public | listing                | table | cassandratong
 public | listings               | table | cassandratong
 public | unittypes              | table | cassandratong
 public | users                  | table | cassandratong

                Table "public.amenities"
   Column    |  Type   | Collation | Nullable | Default 
-------------+---------+-----------+----------+---------
 id          | integer |           | not null | 
 amen_cat_id | integer |           | not null | 
 item        | text    |           | not null | 
 description | text    |           |          | 

           Table "public.amenitiescategories"
    Column    |  Type   | Collation | Nullable | Default 
--------------+---------+-----------+----------+---------
 id           | integer |           | not null | 
 amencategory | text    |           |          | 

          Table "public.joinlistingsamenities"
    Column    |  Type   | Collation | Nullable | Default 
--------------+---------+-----------+----------+---------
 id           | integer |           | not null | 
 listings_id  | integer |           | not null | 
 amenities_id | integer |           | not null | 

          Table "public.joinlistingshighlights"
    Column     |  Type   | Collation | Nullable | Default 
---------------+---------+-----------+----------+---------
 id            | integer |           | not null | 
 listings_id   | integer |           | not null | 
 highlights_id | integer |           |          | 

                 Table "public.highlights"
     Column     |  Type   | Collation | Nullable | Default 
----------------+---------+-----------+----------+---------
 id             | integer |           | not null | 
 highlight_item | text    |           | not null | 
 highlight_desc | text    |           |          | 

-- GET DESCRIPTION
DROP INDEX IF EXISTS index_listings_id;
CREATE INDEX IF NOT EXISTS index_listings_id ON listings(id);

SELECT *
FROM listings
JOIN users ON listings.users_id = users.id 
JOIN unittypes ON listings.unittype = unittypes.id
WHERE listings.id = 10;

SELECT *
FROM listings
JOIN users ON listings.users_id = users.id 
JOIN unittypes ON listings.unittype = unittypes.id
WHERE listings.id = 9555000;

-- GET HIGHLIGHT
DROP INDEX IF EXISTS index_joinlistingshighlights_highglights_id;
CREATE INDEX IF NOT EXISTS index_joinlistingshighlights_highglights_id ON joinlistingshighlights(listings_id, highlights_id);

SELECT *
FROM joinlistingshighlights
JOIN highlights ON joinlistingshighlights.highlights_id = highlights.id
WHERE joinlistingshighlights.listings_id = 10;

SELECT *
FROM joinlistingshighlights
JOIN highlights ON joinlistingshighlights.highlights_id = highlights.id
WHERE joinlistingshighlights.listings_id = 9555001;

-- GET AMENITIES ALSO
DROP INDEX IF EXISTS index_joinlistingsamenities_listings_id;
CREATE INDEX IF NOT EXISTS index_joinlistingsamenities_listings_id ON joinlistingsamenities(listings_id, amenities_id);

-- DROP INDEX IF EXISTS index_joinlistingsamenities_listings_id;
-- CREATE INDEX IF NOT EXISTS index_joinlistingsamenities_listings_id ON joinlistingsamenities(listings_id);

SELECT * 
FROM joinlistingsamenities 
JOIN (amenities JOIN amenitiescategories ON amenities.amen_cat_id = amenitiescategories.id)
ON joinlistingsamenities.amenities_id = amenities.id
WHERE joinlistingsamenities.listings_id = 10;

SELECT * 
FROM joinlistingsamenities 
JOIN (amenities JOIN amenitiescategories ON amenities.amen_cat_id = amenitiescategories.id)
ON joinlistingsamenities.amenities_id = amenities.id
WHERE joinlistingsamenities.listings_id = 9555002;


-- GET DESCRIPTION
-- SELECT *
-- FROM listings
-- JOIN users ON listings.users_id = users.id 
-- JOIN unittypes ON listings.unittype = unittypes.id
-- JOIN 
--   (joinlistingshighlights JOIN highlights ON joinlistingshighlights.highlights_id = highlights.id AND listings.id = joinlistingshighlights.listings_id) ON listings.id = joinlistingshighlights.listings_id
-- WHERE listings.id = 10;

-- joinlistingsamenities JOIN amenities ON joinlistingsamenities.amenities_id = amenities.id WHERE joinlistingsamenities.listings_id = 10;
-- amenities JOIN amenitiescategories ON amenities.amen_cat_id = amenitiescategories.id WHERE amenities.id = 10;