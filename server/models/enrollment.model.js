import mongoose from 'mongoose'

const EnrollmentSchema = new mongoose.Schema({
  evenmt: {type: mongoose.Schema.ObjectId, ref: 'evenmt'},
  updated: Date,
  enrolled: {
    type: Date,
    default: Date.now
  },
  employee: {type: mongoose.Schema.ObjectId, ref: 'User'},
  activityStatus: [{
      activity: {type: mongoose.Schema.ObjectId, ref: 'Activity'}, 
      complete: Boolean}],
  completed: Date
})

export default mongoose.model('Enrollment', EnrollmentSchema)
