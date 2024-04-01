import { MongoClient } from 'mongodb';

async function separateUsersAndTweets() {

  const client = await MongoClient.connect('mongodb://localhost:27017/');
  await tweetsOnlyColl.drop();
  const db = client.db('ieeevisTweets');
  const tweetColl = db.collection('tweet');
  const userColl = db.collection('Users');
  const tweetsOnlyColl = db.collection('Tweets_Only');

  const uniqueUserIds = new Set();

  const tweets = await tweetColl.find({}).toArray();

  for (const tweet of tweets) {
    const user = tweet.user;

    if (!uniqueUserIds.has(user.id)) {
        await userColl.insertOne(user);
        uniqueUserIds.add(user.id);
    }

    const tweetOnly = {
        ...tweet,
        user: user.id 
    };

    await tweetsOnlyColl.insertOne(tweetOnly);
  }

  await client.close();
}