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


-- from cqlsh, copy over csv data from EC2 to cassandra database
-- COPY amenities (id, categories, item, itemdescription) FROM '/home/ec2-user/amenities.csv' WITH DELIMITER = '|' AND HEADER = 'false';
