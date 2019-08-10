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

ALTER TABLE izippy.amenities 
WITH compaction = { 'class' :  'LeveledCompactionStrategy'  };

-- ALTER TABLE izippy.amenities 
-- WITH caching = { 
--    'keys' : 'NONE', 
--    'rows_per_partition' : 'NONE' };

-- PRIMARY KEY (id, categories, item)
-- this is a composite (aka compound) primary key
-- first part (id) is PARTITION KEY
-- second part (categories, item) are CLUSTERING KEYS
-- you can query by just the partition key even if you have clustering keys defined
-- you can query with all keys (both partition and clustering)
-- The "general" rule to make query is you have to pass at least all partition key columns, then you can add optionally each clustering key in the order they're set.


-- ==================================
-- COPY TO SINGLE NODE CLUSTER
-- ==================================
-- copy from csv data to table listings in cqlsh, one at a time
scp -i "Administrator-key-pair-uswest1.pem" /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/database3/amenities1.csv ec2-user@ec2-54-241-154-236.us-west-1.compute.amazonaws.com:~/

-- from cqlsh, copy over csv data from EC2 to cassandra database
COPY amenities (id, categories, item, itemdescription) FROM '/home/ec2-user/amenities.csv' WITH DELIMITER = '|' AND HEADER = 'false';

-- ==================================
-- COPY TO MULTI NODE CLUSTER
-- ==================================
-- copy from csv data to table listings in cqlsh, one at a time (SEED 1, NODE1: 172.31.8.96)
scp -i "Administrator-key-pair-uswest1.pem" /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/database3/amenities1.csv ec2-user@ec2-54-183-9-213.us-west-1.compute.amazonaws.com:~/

-- copy from csv data to table listings in cqlsh, one at a time (SEED 2, NODE4: 173.31.5.205)
scp -i "Administrator-key-pair-uswest1.pem" /Users/cassandratong/Documents/gitHub/izippy/listing/Listing/database3/amenities2.csv ec2-user@ec2-13-57-181-226.us-west-1.compute.amazonaws.com:~/

-- from cqlsh, copy over csv data from EC2 to cassandra database
COPY amenities (id, categories, item, itemdescription) FROM '/home/ec2-user/amenities2.csv' WITH DELIMITER = '|' AND HEADER = 'false' AND CHUNKSIZE=2000 AND INGESTRATE=2000;

