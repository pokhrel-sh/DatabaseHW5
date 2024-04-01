//How many tweets are not retweets or replies? (hint the field retweeted_status contains an object when the tweet is a retweeet)
// Answer: 1117

import { MongoClient } from 'mongodb';

const client = await MongoClient.connect('mongodb://localhost:27017/');
const coll = client.db('ieeevisTweets').collection('tweet');
const tweet = await coll.find({}).toArray();

const noRetweetsOrReplies = (tweet.filter(tweet => !tweet.retweeted_status && !tweet.in_reply_to_status_id));

console.log(noRetweetsOrReplies.length);

await client.close(); 
