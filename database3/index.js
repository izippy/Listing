const cassandra = require('cassandra-driver');
// // ==================================
// // Client for Local DB
// // ==================================
// const client = new cassandra.Client({ 
//   contactPoints: ['127.0.0.1:9042'], // defaults to 9042
//   localDataCenter: 'datacenter1',
//   keyspace: 'izippy',
// });

// // ==================================
// // Client for Test Cluster (Single Node Cluster)
// // ==================================
// const client = new cassandra.Client({ 
//   // DB EC2 public IP: 54.241.154.236
//   // DB EC2 private IP: 172.31.14.30
//   contactPoints: ['54.241.154.236'], // defaults to 9042
//   localDataCenter: 'datacenter1',
//   keyspace: 'izippy',
// });

// ===================================
// Client for Cluster2
// ===================================
const client = new cassandra.Client({ 
  contactPoints: ['54.183.9.213, 13.57.181.226'], // defaults to 9042
  localDataCenter: 'us-west',
  keyspace: 'izippy',
});

client.connect(function (err) {
  if (err) return console.error(err);
  console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());
});

module.exports = client;