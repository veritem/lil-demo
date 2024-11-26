this projects assumes you have [nodejs](https://nodejs.org/en) setup on your system. Go a head and run.

```
npm install
npm run dev
```

```
open http://localhost:8000
```

```sh
curl -X POST http://localhost:8000/add -H "Content-Type: application/json" -d '{"payer": "DANNON", "points": 300, "timestamp": "2022-10-31T10:00:00Z"}'

curl -X POST http://localhost:8000/add -H "Content-Type: application/json" -d '{"payer": "UNILEVER", "points": 200, "timestamp": "2022-10-31T11:00:00Z"}'

curl -X POST http://localhost:8000/add -H "Content-Type: application/json" -d '{"payer": "DANNON", "points": -200, "timestamp": "2022-10-31T15:00:00Z"}'

curl -X POST http://localhost:8000/add -H "Content-Type: application/json" -d '{"payer": "MILLER COORS", "points": 10000, "timestamp": "2022-11-01T14:00:00Z"}'

curl -X POST http://localhost:8000/add -H "Content-Type: application/json" -d '{"payer": "DANNON", "points": 1000, "timestamp": "2022-11-02T14:00:00Z"}'
```

```sh
curl http://localhost:8000/balance
```

PS: avoid reload the server between api calls as I'm using an in memory datastructure to store data.