import { MongoClient } from 'mongodb';

const client = await MongoClient.connect('mongodb://localhost:27017/');
const coll = client.db('ieeevisTweets').collection('tweet');

const tweets = await coll.find({}).toArray();

const uniqueUsers = [];

tweets.forEach(tweet => {
  const { screen_name, followers_count } = tweet.user;
  const existingUserIndex = uniqueUsers.findIndex(
    user => user.screen_name === screen_name
  );
  if (existingUserIndex !== -1) {
    uniqueUsers[existingUserIndex].followers_count = Math.max(
      uniqueUsers[existingUserIndex].followers_count,
      followers_count
    );
  } else {
    uniqueUsers.push({ screen_name, followers_count });
  }
});

console.log(uniqueUsers);
await client.close();
