import * as express from 'express'
import db from './db/init'
import gqlExpress from './graphql'

const app = express()

app.use('/graphql', gqlExpress)

app.get('/', (req, res) => {
	// tslint:disable-next-line
	res.send("Awesome! We're live debugging this!")
})

process.on('uncaughtException', (err) => {
	// tslint:disable-next-line
	console.log('Oops! err: ', err) //TODO change to winston
})

app.listen(3001, () => {
	// tslint:disable-next-line
	console.log(`Listening at port: 3001`)
})
