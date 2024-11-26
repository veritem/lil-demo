import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('api is up and running!')
})

type UserPoints = {
  payer: string,
  points: number,
  timestamp: string
}

const db: UserPoints[] = []

app.post("/add", async (c) => {
   const body = await c.req.json<UserPoints>()

   // validation
   if(!body.payer){
	  return c.newResponse("payer is required",400)
   }

   if(!body.points){
	return c.newResponse("points is a required field",400)
   }

   if(isNaN(body.points)){
	return c.newResponse("points field should be a number",400)
   }

   if(isNaN(Date.parse(body.timestamp))){
	 return c.newResponse("timestamp field is a required and should be a valid timestamp",400)
   }

   db.push(body)
   
    return c.body(null,200)
})

type spendRequest = {
	points: number
}

app.post("/spend",async(c) => {
	const body = await c.req.json<spendRequest>()

	if(!body.points || isNaN(body.points)){
		return c.newResponse("points field is required and should be a number",400)
	}

	// get total points
	let sum = db.reduce((prev,cur) => prev + cur.points, 0)

	if (sum < body.points){
	  return c.newResponse("the user doesn't have enough points.", 400)
	}

    //@ts-ignore
	db.sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp))

	const transHist: Record<string, number> = {}

	sum = body.points

	for(let i = 0; i < db.length; i++){
		if(sum == 0) break

		const reduction = Math.min(db[i].points, sum)

		db[i].points -= reduction
		sum -= reduction

		transHist[db[i].payer] = -reduction
	}

	return c.json(transHist)
})

app.get("/balance", async (c) => {
	const balances: Record<string, number> = {}

	for(const item of db){
		balances[item.payer] = item.points
	}

	return c.json(balances, 200)
})

const port = 8000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
