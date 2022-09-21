import Evenmt from '../models/evenmt.model'
import extend from 'lodash/extend'
import fs from 'fs'
import errorHandler from '../helpers/dbErrorHandler'
import formidable from 'formidable'
import defaultImage from './../../client/assets/images/default.png'

const create = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      })
    }
    let evenmt = new Evenmt(fields)
    evenmt.manager= req.profile
    if(files.image){
      evenmt.image.data = fs.readFileSync(files.image.path)
      evenmt.image.contentType = files.image.type
    }
    try {
      let result = await evenmt.save()
      res.json(result)
    }catch (err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}



const evenmtByID = async (req, res, next, id) => {
  try {
    let evenmt = await Evenmt.findById(id).populate('manager', '_id name')
    if (!evenmt)
      return res.status('400').json({
        error: "Evenmt not found"
      })
    req.evenmt = evenmt
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve evenmt"
    })
  }
}

const read = (req, res) => {
  req.evenmt.image = undefined
  return res.json(req.evenmt)
}

const list = async (req, res) => {
  try {
    let evenmts = await Evenmt.find().select('name email updated created')
    res.json(evenmts)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const update = async (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Photo could not be uploaded"
      })
    }
    let evenmt = req.evenmt
    evenmt = extend(evenmt, fields)
    if(fields.activities){
      evenmt.activities = JSON.parse(fields.activities)
    }
    evenmt.updated = Date.now()
    if(files.image){
      evenmt.image.data = fs.readFileSync(files.image.path)
      evenmt.image.contentType = files.image.type
    }
    try {
      await evenmt.save()
      res.json(evenmt)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

const newActivity = async (req, res) => {
  try {
    let activity = req.body.activity
    let result = await Evenmt.findByIdAndUpdate(req.evenmt._id, {$push: {activities: activity}, updated: Date.now()}, {new: true})
                            .populate('manager', '_id name')
                            .exec()
    res.json(result)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    let evenmt = req.evenmt
    let deleteEvenmt = await evenmt.remove()
    res.json(deleteEvenmt)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const isManager = (req, res, next) => {
    const isManager = req.evenmt && req.auth && req.evenmt.manager._id == req.auth._id
    if(!isManager){
      return res.status('403').json({
        error: "User is not authorized"
      })
    }
    next()
}

const listByManager = (req, res) => {
  Evenmt.find({manager: req.profile._id}, (err, evenmts) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(evenmts)
  }).populate('manager', '_id name')
}

const listPublished = (req, res) => {
  Evenmt.find({published: true}, (err, evenmts) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
    res.json(evenmts)
  }).populate('manager', '_id name')
}

const photo = (req, res, next) => {
  if(req.evenmt.image.data){
    res.set("Content-Type", req.evenmt.image.contentType)
    return res.send(req.evenmt.image.data)
  }
  next()
}
const defaultPhoto = (req, res) => {
  return res.sendFile(process.cwd()+defaultImage)
}


export default {
  create,
  evenmtByID,
  read,
  list,
  remove,
  update,
  isManager,
  listByManager,
  photo,
  defaultPhoto,
  newActivity,
  listPublished
}
