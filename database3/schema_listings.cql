-- drop db
-- DROP KEYSPACE IF EXISTS izippy;

-- create db
-- CREATE KEYSPACE IF NOT EXISTS izippy WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

-- use or connect to db
USE izippy;

-- drop all tables
DROP TABLE IF EXISTS listings;

-- create table
-- EXCL AMENITIES
CREATE TABLE IF NOT EXISTS listings (
  id INT,
  title TEXT,
  loc TEXT,
  username TEXT,
  pic TEXT,
  detailtype TEXT,
  detailbedrmnum INT,
  detailbathrmnum INT,
  detailguestmax INT,
  detailbeds SET<text>,
  detailbednum INT,
  highlight1 VARCHAR,
  highlight2 VARCHAR,
  highlight3 VARCHAR,
  highlight4 VARCHAR,
  general TEXT,
  thespace TEXT,
  guestaccess TEXT,
  interactionwithguests TEXT,
  otherthingstonote TEXT,
  license VARCHAR,
  PRIMARY KEY (id)
);

ALTER TABLE izippy.listings 
WITH compaction = { 'class' :  'LeveledCompactionStrategy'  };

-- turn off cassandra caching if using redis 
-- ALTER TABLE izippy.listings 
-- WITH caching = { 
--    'keys' : 'NONE', 
--    'rows_per_partition' : 'NONE' };

/* 
-- create table
-- INC AMENITIES
CREATE TABLE IF NOT EXISTS listings (
  id INT,
  title TEXT,
  loc TEXT,
  username TEXT,
  pic TEXT,
  detailtype TEXT,
  detailbedrmnum INT,
  detailbathrmnum INT,
  detailguestmax INT,
  detailbeds SET<text>,
  detailbednum INT,
  highlight1 VARCHAR,
  highlight2 VARCHAR,
  highlight3 VARCHAR,
  highlight4 VARCHAR,
  general TEXT,
  thespace TEXT,
  guestaccess TEXT,
  interactionwithguests TEXT,
  otherthingstonote TEXT,
  license VARCHAR,
  amencat_basic1 TEXT,
  amencat_basic2 TEXT,
  amencat_notincluded TEXT,
  amencat_guestaccess TEXT,
  amencat_bedandbath TEXT,
  amencat_safetyfeatures TEXT,
  amencat_familyfeatures TEXT,
  amencat_outdoor TEXT,
  amencat_dining TEXT,
  amencat_logistics TEXT,
  amencat_facilities TEXT,
  PRIMARY KEY (id)
);
*/

-- copy over csv data to table, one at at a time
-- COMPLETE: izippy.listings(  id INT, title TEXT, loc TEXT, users map<text, text>, detailtype TEXT, detailbedrmnum INT, detailbathrmnum INT, detailguestmax INT, detailbeds SET<text>, detailbednum INT, highlights map<text,varchar>  general TEXT, thespace TEXT, guestaccess TEXT, interactionwithguests TEXT, otherthingstonote TEXT, license VARCHAR, amencat_Basic_item TEXT, amencat_Not_included_item TEXT, amencat_Guest_access_item TEXT, amencat_Bed_and_bath_item TEXT, amencat_Safety_features_item TEXT, amencat_Family_features_item TEXT, amencat_Outdoor_item TEXT, amencat_Dining_item TEXT, amencat_Logistics_item TEXT, amencat_Facilities_item TEXT, PRIMARY KEY (id))"
-- COPY listings (id, title, loc, map_users, detailtype, detailbedrmnum, detailbathrmnum, detailguestmax, detailbeds, detailbednum) FROM '/Users/cassandratong/Documents/gitHub/izippy/listing/Listing/database3/listings.csv' WITH DELIMITER = '|' AND HEADER = 'false';

-- SAMPLE QUERIES:
-- GET ALL LISTINGS AND AMENITIES FOR id = 5;

-- copy from csv data to table listings in cqlsh, one at a time
scp -i "cassandra3.pem" /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/database3/listings.csv ec2-user@ec2-54-241-154-236.us-west-1.compute.amazonaws.com:~/

-- within EC2, cqlsh, izippy database, copy from csv to cassandra database
COPY listings (id, title, loc, username, pic, detailtype, detailbedrmnum, detailbathrmnum, detailguestmax, detailbeds, detailbednum, highlight1, highlight2, highlight3, highlight4, general, thespace, guestaccess, interactionwithguests, otherthingstonote, license) from '/home/ec2-user/listings.csv' WITH DELIMITER = '|' AND HEADER = 'false';