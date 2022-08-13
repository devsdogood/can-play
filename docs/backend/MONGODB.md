# MongoDB

## Using mongosh

### Connect

```cash
mongosh "mongodb+srv://can-play-ia.nostm.mongodb.net/eventRegistrationDB"
  \ --apiVersion 1
  \ --username can-play-vercel
```

### Delete

```bash
db.participants.deleteMany({})
db.parentguardians.deleteMany({})
db.events.deleteMany({})
```

### Find

```bash
db.participants.find({})
db.parentguardians.find({})
db.events.find({})
```

 Do or do not, there is no try.   -yoda