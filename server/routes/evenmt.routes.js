import express from 'express'
import evenmtCtrl from '../controllers/evenmt.controller'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/evenmts/published')
  .get(evenmtCtrl.listPublished)

router.route('/api/evenmts/by/:userId')
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.isAdmin,evenmtCtrl.create)
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, evenmtCtrl.listByManager)

router.route('/api/evenmts/photo/:evenmtId')
  .get(evenmtCtrl.photo, evenmtCtrl.defaultPhoto)

router.route('/api/evenmts/defaultphoto')
  .get(evenmtCtrl.defaultPhoto)

router.route('/api/evenmts/:evenmtId/activity/new')
  .put(authCtrl.requireSignin, evenmtCtrl.isManager, evenmtCtrl.newActivity)

router.route('/api/evenmts/:evenmtId')
  .get(evenmtCtrl.read)
  .put(authCtrl.requireSignin, evenmtCtrl.isManager,evenmtCtrl.update)
  .delete(authCtrl.requireSignin, evenmtCtrl.isManager, evenmtCtrl.remove)

router.param('evenmtId', evenmtCtrl.evenmtByID)
router.param('userId', userCtrl.userByID)

export default router
