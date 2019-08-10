-- drop db
-- DROP KEYSPACE IF EXISTS izippy;

-- create db
-- CREATE KEYSPACE IF NOT EXISTS izippy WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
CREATE KEYSPACE IF NOT EXISTS izippy WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 2};

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

-- copy over csv data to table, one at at a time
-- COMPLETE: izippy.listings(  id INT, title TEXT, loc TEXT, users map<text, text>, detailtype TEXT, detailbedrmnum INT, detailbathrmnum INT, detailguestmax INT, detailbeds SET<text>, detailbednum INT, highlights map<text,varchar>  general TEXT, thespace TEXT, guestaccess TEXT, interactionwithguests TEXT, otherthingstonote TEXT, license VARCHAR, amencat_Basic_item TEXT, amencat_Not_included_item TEXT, amencat_Guest_access_item TEXT, amencat_Bed_and_bath_item TEXT, amencat_Safety_features_item TEXT, amencat_Family_features_item TEXT, amencat_Outdoor_item TEXT, amencat_Dining_item TEXT, amencat_Logistics_item TEXT, amencat_Facilities_item TEXT, PRIMARY KEY (id))"
-- COPY listings (id, title, loc, map_users, detailtype, detailbedrmnum, detailbathrmnum, detailguestmax, detailbeds, detailbednum) FROM '/Users/cassandratong/Documents/gitHub/izippy/listing/Listing/database3/listings.csv' WITH DELIMITER = '|' AND HEADER = 'false';

-- SAMPLE QUERIES:
-- GET ALL LISTINGS AND AMENITIES FOR id = 5;

-- ==================================
-- COPY TO SINGLE NODE CLUSTER
-- ==================================
-- from bash, copy csv files to EC2 database, one small file at a time
scp -i "Administrator-key-pair-uswest1.pem" /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/database3/listings1.csv ec2-user@ec2-54-241-154-236.us-west-1.compute.amazonaws.com:~/

-- within EC2 database, cqlsh, izippy database, copy csv to EC2 database
COPY listings (id, title, loc, username, pic, detailtype, detailbedrmnum, detailbathrmnum, detailguestmax, detailbeds, detailbednum, highlight1, highlight2, highlight3, highlight4, general, thespace, guestaccess, interactionwithguests, otherthingstonote, license) from '/home/ec2-user/listings.csv' WITH DELIMITER = '|' AND HEADER = 'false';

-- ==================================
-- COPY TO MULTI NODE CLUSTER
-- ==================================
-- from bash, copy csv files to EC2 database, one small file at a time
scp -i "Administrator-key-pair-uswest1.pem" /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/database3/listings1.csv ec2-user@ec2-54-183-9-213.us-west-1.compute.amazonaws.com:~/

-- within EC2 database, cqlsh, izippy database, copy csv to EC2 database
COPY listings (id, title, loc, username, pic, detailtype, detailbedrmnum, detailbathrmnum, detailguestmax, detailbeds, detailbednum, highlight1, highlight2, highlight3, highlight4, general, thespace, guestaccess, interactionwithguests, otherthingstonote, license) from '/home/ec2-user/listings1.csv' WITH DELIMITER = '|' AND HEADER = 'false';

-- ==================================
-- COPY TO EC2 INSTANCE SERVER
-- ==================================
-- copy over all node files to service EC2 instance
-- server index.js
scp -i "Administrator-key-pair-uswest1.pem" /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/server/index.js ec2-user@ec2-13-57-229-208.us-west-1.compute.amazonaws.com:~/

-- database index.js
scp -i "Administrator-key-pair-uswest1.pem" -r /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/database3/ ec2-user@ec2-13-57-229-208.us-west-1.compute.amazonaws.com:~/

-- new relic.js
scp -i "Administrator-key-pair-uswest1.pem" /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/newrelic.js ec2-user@ec2-13-57-229-208.us-west-1.compute.amazonaws.com:~/

-- package.json
scp -i "Administrator-key-pair-uswest1.pem" /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/package.json ec2-user@ec2-13-57-229-208.us-west-1.compute.amazonaws.com:~/

-- loader.io authorization
scp -i "Administrator-key-pair-uswest1.pem" /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/loaderio-76d7ef9bf9df6428b9382685cfe887e2.txt ec2-user@ec2-13-57-229-208.us-west-1.compute.amazonaws.com:~/

-- client folder (use -r flag)
scp -i "Administrator-key-pair-uswest1.pem" -r /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/client ec2-user@ec2-13-57-229-208.us-west-1.compute.amazonaws.com:~/

-- public folder (use -r flag)
scp -i "Administrator-key-pair-uswest1.pem" -r /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/public ec2-user@ec2-13-57-229-208.us-west-1.compute.amazonaws.com:~/