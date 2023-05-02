const Announcement = require("../models/announcement");
const APIFeatures = require("../utils/apiFeatures.js");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require('cloudinary');


//create new announcement

exports.newAnnouncement = async (req, res, next) => {
  console.log(req.user);

//   for (let i = 0; i < images.length; i++) {

//     const result = await cloudinary.v2.uploader.upload(images[i], {

//         folder: 'news'

//     });
//     imagesLinks.push({

//         public_id: result.public_id,

//         url: result.secure_url

//     })

// }



//   req.body.user = req.user.id;

  const announcement = await Announcement.create(req.body);

  res.status(201).json({
    success: true,

    announcement,
  });
};

exports.getAnnouncements = async (req, res, next) => {
  const announcementsCount = await Announcement.countDocuments();

  const apiFeatures = new APIFeatures(Announcement.find(), req.query)
    .search()
    .filter();

  // let announcements = await apiFeatures.query;

  // apiFeatures.pagination(resPerPage);
  announcements = await apiFeatures.query;

  res.status(200).json({
    success: true,
    announcementsCount,
    announcements,
  });

  // return next(new ErrorHandler("my error", 400));
};

exports.getSingleAnnouncement = async (req, res, next) => {
  const announcement = await Announcement.findById(req.params.id);

  console.log(announcement);

  // if(!announcement) {

  // 		return res.status(404).json({

  // 			success: false,

  // 			message: 'Announcement not found'

  // 		});

  // }

  if (!announcement) {
    return next(new ErrorHandler("Announcement not found", 404));
  }

  res.status(200).json({
    success: true,

    announcement,
  });
};

exports.updateAnnouncement = async (req, res, next) => {
  let announcement = await Announcement.findById(req.params.id);

  if (!announcement) {
    return res.status(404).json({
      success: false,

      message: "Announcement not found",
    });
  }

  announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, {
    new: true,

    runValidators: true,

    useFindandModify: false,
  });

  if (!announcement) {
    return next(new ErrorHandler("Announcement not found", 404));
  }

  res.status(200).json({
    success: true,

    announcement,
  });
};

exports.deleteAnnouncement = async (req, res, next) => {
  const announcement = await Announcement.findById(req.params.id);

  if (!announcement) {
    return res.status(404).json({
      success: false,

      message: "Announcement not found",
    });
  }

  await announcement.remove();

  if (!announcement) {
    return next(new ErrorHandler("Announcement not found", 404));
  }

  res.status(200).json({
    success: true,

    announcement,
  });
};


// exports.createAnnouncementReview = async (req, res, next) => {



//   const { rating, comment, announcementId } = req.body;



//   const review = {

//       user: req.user._id,

//       name: req.user.name,

//       rating: Number(rating),

//       comment

//   }



//   const announcement = await Announcement.findById(announcementId);



//   const isReviewed = announcement.reviews.find(

//       r => r.user.toString() === req.user._id.toString()

//   )



//   if (isReviewed) {

//       announcement.reviews.forEach(review => {

//           if (review.user.toString() === req.user._id.toString()) {

//               review.comment = comment;

//               review.rating = rating;

//           }

//       })



//   } else {

//       announcement.reviews.push(review);

//       announcement.numOfReviews = announcement.reviews.length

//   }



//   announcement.ratings = announcement.reviews.reduce((acc, item) => item.rating + acc, 0) / announcement.reviews.length



//   await announcement.save({ validateBeforeSave: false });



//   res.status(200).json({

//       success: true

//   })



// }

// exports.getAnnouncementReviews = async (req, res, next) => {

//   const announcement = await Announcement.findById(req.query.id);

//   res.status(200).json({

//       success: true,

//       reviews: announcement.reviews

//   })

// }

exports.getAdminAnnouncements = async (req, res, next) => {



  const announcements = await Announcement.find();



  res.status(200).json({

      success: true,

      announcements

  })



}



