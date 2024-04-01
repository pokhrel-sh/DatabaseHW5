//Who are the top 10 people that got more retweets in average, after tweeting more than 3 times

import { MongoClient } from 'mongodb';

const client = await MongoClient.connect('mongodb://localhost:27017/');
const coll = client.db('ieeevisTweets').collection('tweet');

const tweets = await coll.find({}).toArray();

const userStats = {};

tweets.forEach(tweet => {
  const screen_name = tweet.user.screen_name;

  const retweet_count = tweet.retweet_count || 0;

  if (!userStats[screen_name]) {
    userStats[screen_name] = {
      total_tweets: 0,
      total_retweets: 0
    };
  }

  userStats[screen_name].total_tweets++;

  userStats[screen_name].total_retweets += retweet_count;
});
const filteredUserStats = Object.entries(userStats)
  .filter(([_, stats]) => stats.total_tweets > 3)
  .map(([screen_name, stats]) => ({
    screen_name,
    average_retweets: stats.total_retweets / stats.total_tweets
  }));

filteredUserStats.sort((a, b) => b.average_retweets - a.average_retweets);
const top10Users = filteredUserStats.slice(0, 10);

console.log(top10Users);
await client.close();
