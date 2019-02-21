import {
	buildSchema,
 } from 'graphql'
import * as graphqlHTTP from 'express-graphql'
import { makeExecutableSchema } from 'graphql-tools'
import Post, { IPostFind } from '../db/models/Post'
import Comment, { ICommentFind, ICommentCreate } from '../db/models/Comment'

const typeDefs = `
	type Post {
		_id: String
		title: String
		description: String
		authorId: String
		comments: [Comment!]
	}

	type Comment {
		_id: String
		description: String
		authorId: String
		postId: String
	}

	type Query {
		getPosts(postId: String, title: String): [Post!]
		getComment(description: String, authorId: String, postId: String): [Comment!]
  }

	type Mutation {
		createPost(title: String!): Post
		createComment(description: String!, authorId: String!, postId: String!): Comment
	}
`

const resolvers = {
	Query: {
		getPosts: async (obj, args: IPostFind, context, info) => {
			// query {
			//   getPosts(postId: "5c6d65e06cf58c029154a11c"){
			//     _id,
			//     title,
			//     description,
			//     comments{
			//       description,
			//       authorId,
			//       _id,
			//       postId
			//     }
			//   }
			// }
			const result = await Post.find(args)

			return result
		},
		getComment: async (params: ICommentFind) => {
			const result = await Comment.find(params)
			return result
		},
	},

	Mutation: {
		createPost: async ({ title }: { title: string }) => {
			// works
			// mutation {
			//   createPost(title: "title11") {
			//     title,
			//     _id
			//   }
			// }
			const result = await Post.create({ title })
			return result
		},
		createComment: async (obj, args: ICommentCreate, context, info) => {
			const { description, authorId, postId } = args
			// works
			// mutation {
			//   createComment(description: "comment1", authorId: "1", postId: "5c6d65e06cf58c029154a11c") {
			//     title,
			//     _id
			//   }
			// }
			const result = await Comment.create({
				description,
				authorId,
				postId
			})
			return result
		}
	},

	Post: {
		comments: async (params: { _id: string }) => {
			const result = await Comment.find({ postId: params._id })
			return result
		},
	},
}

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
})

const graphqlHttp = graphqlHTTP({
	schema,
	graphiql: true
})

export default graphqlHttp
