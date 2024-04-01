//Who is the person that got the most tweets?
import { MongoClient } from 'mongodb';

const client = await MongoClient.connect('mongodb://localhost:27017/');
const coll = client.db('ieeevisTweets').collection('tweet');

const tweets = await coll.find({}).toArray();

const tweetCount = {};

tweets.forEach(tweet => {
    const screen_name = tweet.user.screen_name;
    if (tweetCount[screen_name]) {
        tweetCount[screen_name]++;
    } else {
        tweetCount[screen_name] = 1;
    }
});

let maxTweets = 0;
for (const count of Object.values(tweetCount)) {
    if (count > maxTweets) {
        maxTweets = count;
    }
}

const mostTweets = Object.keys(tweetCount).find(
    key => tweetCount[key] === maxTweets
);

console.log(mostTweets);
await client.close();
