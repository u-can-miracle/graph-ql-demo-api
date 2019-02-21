import { ObjectID } from 'mongodb'
import db from '../init'

const collectionName = 'post'

export interface IPostFind {
	postId?: string
	title?: string
	description?: string
	author?: string
}

interface IPostParams {
	title?: string
	description?: string
	author?: string
}

const PostModel = {
	find: async (params: IPostFind) => {
		const { postId, ...other } = params
		const mongoDb = db.getDb()
		// tslint:disable-next-line
		let _id
		if(postId){
			_id = new ObjectID(params.postId)
		}
		const result = await mongoDb.collection(collectionName).find({
			...other,
			_id
		})
		return result.toArray()
	},
	create: async (params: IPostParams) => {
		const mongoDb = db.getDb()
		const result = await mongoDb.collection(collectionName).insert(params)
		return result.ops[0]
	}
}

export default PostModel
