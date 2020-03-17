const connectDb = require('./db')

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
      console.error(error)
    }
  }
}
