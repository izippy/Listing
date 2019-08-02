#!/bin/bash

#createdb, run with sh <this filename>
# ????psql postgres < ./database2/schema.sql",
# psql -h localhost -f postgres/postgresql.sql
# echo "done with postgres"

cqlsh -f database3/schema_listings.cql
echo "done with cassandra_listings"

# cqlsh -f database3/schema_amenities.cql
# echo "done with cassandra_amenities"
