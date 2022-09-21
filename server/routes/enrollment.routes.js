import express from 'express'
import enrollmentCtrl from '../controllers/enrollment.controller'
import evenmtCtrl from '../controllers/evenmt.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/enrollment/enrolled')
  .get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)

router.route('/api/enrollment/new/:evenmtId')
  .post(authCtrl.requireSignin, enrollmentCtrl.findEnrollment, enrollmentCtrl.create)  

router.route('/api/enrollment/stats/:evenmtId')
  .get(enrollmentCtrl.enrollmentStats)

router.route('/api/enrollment/complete/:enrollmentId')
  .put(authCtrl.requireSignin, enrollmentCtrl.isEmployee, enrollmentCtrl.complete) 

router.route('/api/enrollment/:enrollmentId')
  .get(authCtrl.requireSignin, enrollmentCtrl.isEmployee, enrollmentCtrl.read)
  .delete(authCtrl.requireSignin, enrollmentCtrl.isEmployee, enrollmentCtrl.remove)

router.param('evenmtId', evenmtCtrl.evenmtByID)
router.param('enrollmentId', enrollmentCtrl.enrollmentByID)

export default router
