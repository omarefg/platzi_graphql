const { ObjectID } = require('mongodb')
const connectDb = require('./db')
const errorHandler = require('./errorHandler')

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: '',
      topic: ''
    }
    try {
      const db = await connectDb()
      const course = await db.collection('courses')
        .insertOne({ ...defaults, ...input })
      return {
        ...input,
        _id: course.insertedId
      }
    } catch (error) {
      errorHandler(error)
    }
  },
  editCourse: async (root, { _id, input }) => {
    try {
      const db = await connectDb()
      await db.collection('courses').updateOne({ _id: ObjectID(_id) }, { $set: input })
      const course = await db.collection('courses').findOne({ _id: ObjectID(_id) })
      return course
    } catch (error) {
      errorHandler(error)
    }
  },
  deleteCourse: async (root, { _id }) => {
    try {
      const db = await connectDb()
      await db.collection('courses').deleteOne({ _id: ObjectID(_id) })
      return true
    } catch (error) {
      errorHandler(error)
    }
  },
  createPerson: async (root, { input }) => {
    try {
      const db = await connectDb()
      const student = await db.collection('students').insertOne(input)
      return {
        ...input,
        _id: student.insertedId
      }
    } catch (error) {
      errorHandler(error)
    }
  },
  editPerson: async (root, { _id, input }) => {
    try {
      const db = await connectDb()
      await db.collection('students').updateOne({ _id: ObjectID(_id) }, { $set: input })
      const student = await db.collection('students').findOne({ _id: ObjectID(_id) })
      return student
    } catch (error) {
      errorHandler(error)
    }
  },
  deletePerson: async (root, { _id }) => {
    try {
      const db = await connectDb()
      await db.collection('students').deleteOne({ _id: ObjectID(_id) })
      return true
    } catch (error) {
      errorHandler(error)
    }
  },
  addPeople: async (root, { courseID, personID }) => {
    try {
      const db = await connectDb()
      let course = await db.collection('courses').findOne({ _id: ObjectID(courseID) })
      const person = await db.collection('students').findOne({ _id: ObjectID(personID) })
      if (!course || !person) {
        throw new Error('La persona o el curso no existen')
      }
      await db.collection('courses').updateOne(
        { _id: ObjectID(courseID) },
        { $addToSet: { people: ObjectID(personID) } }
      )
      course = await db.collection('courses').findOne({ _id: ObjectID(courseID) })
      return course
    } catch (error) {
      errorHandler(error)
    }
  }
}
