const sdk = require("node-appwrite");

// Init SDK
const client = new sdk.Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6515b958ba9998cec645")
  .setKey(
    "e8bb3ae144bd0b454da77c8add88195f6a6bc86fab56a579137c45280e15c3e12424a4be3ff70e6960ce0d00c09c8b5b093693fa3e6b0f70ddd58f91f13447a7db915842466ddb40db7fb9e0fb1d1eedf9ee0ca8644501d517bebc0c0c974c485308cec5999de1fb97b53055ec6e09ced35c6eb893e72855c4651c4e742dc142"
  ); // Your secret API key

const Users = new sdk.Users(client);
const Account = new sdk.Account(client);

const Database = new sdk.Databases(client);

module.exports = { Users, Account, Database };
