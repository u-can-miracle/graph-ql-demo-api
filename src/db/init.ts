import { MongoClient } from 'mongodb'

const url = 'mongodb://mongo:27017'
export const dbName = 'graphql'

const options = {
	useNewUrlParser: true,
	reconnectTries: 60,
	reconnectInterval: 1000,
	poolSize: 10,
	bufferMaxEntries: 0 // If not connected, return errors immediately rather than waiting for reconnect
}

let mongoDb

const db = {
	connect: () => {
		MongoClient.connect(url, options, (err, client) => {
			if(err){
				// tslint:disable-next-line
				console.log('err', err)
			}
			// tslint:disable-next-line
			console.log("Connected successfully to mongo")

			mongoDb = client.db(dbName)
		})
	},
	getDb: () => {
		return mongoDb
	}
}

db.connect()

// Use connect method to connect to the server
export default db
