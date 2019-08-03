-- drop db
-- DROP KEYSPACE IF EXISTS izippy;

-- create db
-- CREATE KEYSPACE IF NOT EXISTS izippy WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

-- use or connect to db
USE izippy;

-- drop all tables
DROP TABLE IF EXISTS amenities;

-- create sample table
CREATE TABLE IF NOT EXISTS amenities (
  id INT,
  categories TEXT,
  item TEXT,
  itemdescription TEXT,
  PRIMARY KEY (id, categories, item)
) WITH CLUSTERING ORDER BY (categories ASC, item ASC);

-- ALTER TABLE izippy.amenities 
-- WITH compaction = { 'class' :  'LeveledCompactionStrategy'  };

-- ALTER TABLE izippy.amenities 
-- WITH caching = { 
--    'keys' : 'NONE', 
--    'rows_per_partition' : 'NONE' };

-- copy over csv data to table, one at at a time
-- COMPLETE: izippy.listings(  id INT, title TEXT, loc TEXT, users map<text, text>, detailtype TEXT, detailbedrmnum INT, detailbathrmnum INT, detailguestmax INT, detailbeds SET<text>, detailbednum INT, highlights map<text,varchar>  general TEXT, thespace TEXT, guestaccess TEXT, interactionwithguests TEXT, otherthingstonote TEXT, license VARCHAR, amencat_Basic_item TEXT, amencat_Not_included_item TEXT, amencat_Guest_access_item TEXT, amencat_Bed_and_bath_item TEXT, amencat_Safety_features_item TEXT, amencat_Family_features_item TEXT, amencat_Outdoor_item TEXT, amencat_Dining_item TEXT, amencat_Logistics_item TEXT, amencat_Facilities_item TEXT, PRIMARY KEY (id))"
-- COPY listings (id, title, loc, map_users, detailtype, detailbedrmnum, detailbathrmnum, detailguestmax, detailbeds, detailbednum) FROM '/Users/cassandratong/Documents/gitHub/izippy/listing/Listing/database3/listings.csv' WITH DELIMITER = '|' AND HEADER = 'false';

-- PRIMARY KEY (id, categories, item)
-- this is a composite (aka compound) primary key
-- first part (id) is PARTITION KEY
-- second part (categories, item) are CLUSTERING KEYS
-- you can query by just the partition key even if you have clustering keys defined
-- you can query with all keys (both partition and clustering)
-- The "general" rule to make query is you have to pass at least all partition key columns, then you can add optionally each clustering key in the order they're set.