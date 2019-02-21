import db from '../init'

const collectionName = 'author'

const AuthorModel = db.getCollection(collectionName)

export default AuthorModel
