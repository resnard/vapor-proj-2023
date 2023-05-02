const express = require("express");

const router = express.Router();

const upload = require("../utils/multer");

const {
  isAuthenticatedUser,

  authorizeRoles,
} = require("../middlewares/auth");

const {
  getAnnouncements,
  newAnnouncement,
  getSingleAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
//   createAnnouncementReview,
//   getAnnouncementsReviews,
  getAdminAnnouncements
//   deleteReview
} = require("../controllers/announcementController");

// router.get("/announcements", isAuthenticatedUser, getAnnouncements);

router.route("/announcement").get(getAnnouncements);
router.route("/announcement/new").post(newAnnouncement);
router.route("/announcement/:id").get(getSingleAnnouncement);
router.route("/announcement/:id").put(updateAnnouncement).delete(deleteAnnouncement);
// router.route("/admin/announcement/:id").put(updateAnnouncement).delete(deleteAnnouncement);
// router.put('/review',isAuthenticatedUser, createAnnouncementReview);
// router.get('/reviews',isAuthenticatedUser, getAnnouncementsReviews);
router.get('/admin/announcements',isAuthenticatedUser ,getAdminAnnouncements);
router.post('/admin/announcement/new', isAuthenticatedUser, authorizeRoles('admin'), upload.array('images', 10),newAnnouncement);
router.route('/admin/announcement/:id').put(isAuthenticatedUser, authorizeRoles('admin'), upload.array('images', 10), updateAnnouncement)

// router.route('/reviews').delete(isAuthenticatedUser, deleteReview);
// router.get(
//   "/announcements",
//   isAuthenticatedUser,
//   authorizeRoles("admin"),
//   getAnnouncements
// );

// router.post(
//   "/admin/announcement/new",
//   isAuthenticatedUser,
//   authorizeRoles("admin"),
//   NewAnnouncement
// );

// router
//   .route("/admin/announcement/:id")
//   .put(isAuthenticatedUser, authorizeRoles("admin"), updateAnnouncement)
//   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteAnnouncement);

module.exports = router;
