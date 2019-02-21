import {
	graphql,
	buildSchema,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString
 } from 'graphql'
import * as graphqlHTTP from 'express-graphql'

import db, { collectionName } from '../db/init'

const schema = buildSchema(`
	type Message {
	  _id: String
	  message: String
	}

	type Query {
		getMessages(message: String!): [Message]
		ip: String
  }

	type Mutation {
		createMessage(message: String!): Message
		updateMessage(oldMessage: String!, newMessage: String!): Message
		removeMessage(message: String!): Boolean
	}
`)

const root = {
	ip: (args, request) => {
		return request.ip
	},
	getMessages: async ({ message }: { message: string }) => {
		// query {
		//   getMessages(message: "message1") {
		//     _id
		//     message
		//   }
		// }
		const result = await db.getDb()
			.collection(collectionName)
			.find({ message })
			.limit(1)
			.toArray()

		return result
	},
	createMessage: async (message: string) => {
		// works
		// mutation {
		//   createMessage(message: "message1") {
		//     _id
		//     message
		//   }
		// }
		const result = await db.getDb().collection(collectionName).insert(message)
		return result.ops[0]
	},
	updateMessage: async ({ oldMessage, newMessage }) => {
		// mutation {
		//   updateMessage(oldMessage: "123", newMessage: "76567567") {
		//     _id
		//     message
		//   }
		// }

		const result = await db.getDb().collection(collectionName).findOneAndUpdate(
			{ message: oldMessage },
			{ $set: { message: newMessage } },
			{ returnOriginal: false }
		)
		return result.value
	},
	removeMessage: async ({ message }: { message: string }) => {
		// mutation {
		//   removeMessage(message: "123")
		// }
		const result = await db.getDb().collection(collectionName).deleteOne({ message })
		return result.deletedCount === 1
	}
}

const graphqlHttp = graphqlHTTP({
	schema,
	rootValue: root,
	graphiql: true
})

export default graphqlHttp
