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

-- copy csv data to table, one at at a time
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

-- create index for listings table
DROP INDEX IF EXISTS index_listings_id;
CREATE INDEX IF NOT EXISTS index_listings_id ON listings(id);

-- create index for listings-highlights join table
DROP INDEX IF EXISTS index_joinlistingshighlights_highglights_id;
CREATE INDEX IF NOT EXISTS index_joinlistingshighlights_highglights_id ON joinlistingshighlights(listings_id, highlights_id);

-- create index for listings-amenities join table
DROP INDEX IF EXISTS index_joinlistingsamenities_listings_id;
CREATE INDEX IF NOT EXISTS index_joinlistingsamenities_listings_id ON joinlistingsamenities(listings_id, amenities_id);

-- Core queries: GET description and GET amenities for all listings
-- SELECT * FROM listings WHERE id = 14;
-- SELECT l.id, a.name, ac.category, la.offers, la.additional_info FROM listings l JOIN listings_amenities la ON la.listings_id = l.id 
-- JOIN amenities a ON a.id = la.amenities_id JOIN amenities_categories ac ON ac.id = a.amenities_categories_id WHERE l.id = 205;

-- Sample query: GET DESCRIPTION
-- SELECT *
-- FROM listings
-- JOIN users ON listings.users_id = users.id 
-- JOIN unittypes ON listings.unittype = unittypes.id
-- WHERE listings.id = 10;

-- Sample query: GET HIGHLIGHT
-- SELECT *
-- FROM joinlistingshighlights
-- JOIN highlights ON joinlistingshighlights.highlights_id = highlights.id
-- WHERE joinlistingshighlights.listings_id = 10;

-- Sample query: GET LISTINGSAMENITIES
-- SELECT * 
-- FROM joinlistingsamenities 
-- JOIN (amenities JOIN amenitiescategories ON amenities.amen_cat_id = amenitiescategories.id)
-- ON joinlistingsamenities.amenities_id = amenities.id
-- WHERE joinlistingsamenities.listings_id = 10;

-- Sample query: GET DESCRIPTION
-- SELECT *
-- FROM listings
-- JOIN users ON listings.users_id = users.id 
-- JOIN unittypes ON listings.unittype = unittypes.id
-- JOIN 
--   (joinlistingshighlights JOIN highlights ON joinlistingshighlights.highlights_id = highlights.id AND listings.id = joinlistingshighlights.listings_id) ON listings.id = joinlistingshighlights.listings_id
-- WHERE listings.id = 10;

-- Sample query: GET AMENITIES
-- joinlistingsamenities JOIN amenities ON joinlistingsamenities.amenities_id = amenities.id WHERE joinlistingsamenities.listings_id = 10;
-- amenities JOIN amenitiescategories ON amenities.amen_cat_id = amenitiescategories.id WHERE amenities.id = 10;