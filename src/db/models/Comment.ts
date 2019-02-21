import db from '../init'

const collectionName = 'comment'

export interface ICommentCreate {
	description: string
	authorId: string
	postId: string
}

export interface ICommentFind {
	description?: string
	authorId?: string
	postId?: string
}

const CommentModel = {
	find: async (params: ICommentFind) => {
		const mongoDb = db.getDb()
		const result = await mongoDb
			.collection(collectionName)
			.find({ postId: params.postId.toString() })
			.toArray()
		return result
	},
	create: async (params: ICommentCreate) => {
		const mongoDb = db.getDb()
		const result = await mongoDb.collection(collectionName).insert(params)
		return result.ops[0]
	}
}

export default CommentModel
