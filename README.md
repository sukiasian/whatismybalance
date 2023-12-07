# This mini app allows operations with the balance of a user. 

# How to use?

Start a container through 
\$ docker-compose up

## 1. Get any user id through GET 127.0.0.1:7070/api/users
Every user has by 10000 on the balance by default so pick any. 
A new user is created on the app initialization.

## 2. Start doing calculations with PATCH 127.0.0.1:7070/api/users/{userId}/balance
The endpoint accepts only "amount" field which should be strictly numeric.