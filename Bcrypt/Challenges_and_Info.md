# 12) Understand BCrypt Hashes

BCrypt hashes are very secure. A hash is basically a fingerprint of the original data- always unique. This is accomplished by feeding the original data into an algorithm and returning a fixed length result. To further complicate this process and make it more secure, you can also salt your hash. Salting your hash involves adding random data to the original data before the hashing process which makes it even harder to crack the hash.

BCrypt hashes will always look like 
```
$2a$13$ZyprE5MRw2Q3WpNOGZWGbeG7ADUre1Q8QO.uUUtcbqloU0yvzavOm
``` 
which does have a structure. The first small bit of data ```$2a``` is defining what kind of hash algorithm was used. The next portion ```$13``` defines the cost. Cost is about how much power it takes to compute the hash. It is on a logarithmic scale of 2^cost and determines how many times the data is put through the hashing algorithm. For example, at a cost of 10 you are able to hash 10 passwords a second on an average computer, however at a cost of 15 it takes 3 seconds per hash... and to take it further, at a cost of 31 it would take multiple days to complete a hash. A cost of 12 is considered very secure at this time. The last portion of your hash 
```
$ZyprE5MRw2Q3WpNOGZWGbeG7ADUre1Q8QO.uUUtcbqloU0yvzavOm
```
looks like one large string of numbers, periods, and letters but it is actually two separate pieces of information. The first 22 characters is the salt in plain text, and the rest is the hashed password!

Add all your code for these lessons in the server.js file between the code we have started you off with. Do not change or delete the code we have added for you.

BCrypt has already been added as a dependency, so require it as bcrypt in your server.


# 13) Hash and Compare Passwords Asynchronously

As hashing is designed to be computationally intensive, it is recommended to do so asynchronously on your server as to avoid blocking incoming connections while you hash. All you have to do to hash a password asynchronous is call
```
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
    // Store hash in your db
});
``` 

Add this hashing function to your server (we've already defined the variables used in the function for you to use) and log it to the console for you to see! At this point you would normally save the hash to your database.

Now when you need to figure out if a new input is the same data as the hash you would just use the compare function. 
```
bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
  // res == true or false
}); 
```

Add this into your existing hash function (since you need to wait for the hash to complete before calling the compare function) after you log the completed hash and log 'res' to the console within the compare. You should see in the console a hash, and then 'true' is printed! If you change 'myPlaintextPassword' in the compare function to 'someOtherPlaintextPassword', then it should say false.
```
bcrypt.hash('passw0rd!', 13, (err, hash) => {
  console.log(hash);
  //$2a$12$Y.PHPE15wR25qrrtgGkiYe2sXo98cjuMCG1YwSI5rJW1DSJp0gEYS
  bcrypt.compare('passw0rd!', hash, (err, res) => {
    console.log(res); //true
  });
}); 
```


# 14) Hash and Compare Passwords Synchronously

Hashing synchronously is just as easy to do but can cause lag if using it server side with a high cost or with hashing done very often. Hashing with this method is as easy as calling
```
var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
```

Add this method of hashing to your code and then log the result to the console. Again, the variables used are already defined in the server so you won't need to adjust them. You may notice even though you are hashing the same password as in the async function, the result in the console is different- this is due to the salt being randomly generated each time as seen by the first 22 characters in the third string of the hash. Now to compare a password input with the new sync hash, you would use the compareSync method:
```
var result = bcrypt.compareSync(myPlaintextPassword, hash);
```
with the result being a boolean true or false.

Add the function in and log the result to the console to see it working.

