const { ObjectID } = require('mongodb')
const connectDb = require('./db')
const errorHandler = require('./errorHandler')

module.exports = {
  getCourses: async () => {
    let db
    let courses = []
    try {
      db = await connectDb()
      courses = await db.collection('courses').find().toArray()
    } catch (error) {
      errorHandler(error)
    }
    return courses
  },
  getCourse: async (root, { _id }) => {
    let db
    let courses = []
    try {
      db = await connectDb()
      courses = await db.collection('courses').findOne({ _id: ObjectID(_id) })
    } catch (error) {
      errorHandler(error)
    }
    return courses
  },
  getPeople: async () => {
    let db
    let students = []
    try {
      db = await connectDb()
      students = await db.collection('students').find().toArray()
    } catch (error) {
      errorHandler(error)
    }
    return students
  },
  getPerson: async (root, { _id }) => {
    let db
    let student = []
    try {
      db = await connectDb()
      student = await db.collection('students').findOne({ _id: ObjectID(_id) })
    } catch (error) {
      errorHandler(error)
    }
    return student
  },
  searchItems: async (root, { keyword }) => {
    try {
      const db = await connectDb()
      const courses = await db.collection('courses').find({ $text: { $search: keyword } }).toArray()
      const people = await db.collection('students').find({ $text: { $search: keyword } }).toArray()
      const items = [...courses, ...people]
      return items
    } catch (error) {
      errorHandler(error)
    }
  }
}
