const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  name: {
    type: String,

    required: [true, "Please enter announcement name"],

    trim: true,

    maxLength: [100, "Announcement name cannot exceed 100 characters"],
  },

  description: {
    type: String,

    required: [true, "Please enter announcement description"],
  },

//   images: [
//     {
//       public_id: {
//         type: String,

//         required: true,
//       },

//       url: {
//         type: String,

//         required: false,
//       },
//     },
//   ],


  publisher: {
    type: String,

    required: [true, "Please enter announcement publisher"],

    default: 'Vapor Incorporation',
  },


  // user: {
  //   type: mongoose.Schema.ObjectId,

  //   ref: "User",

  //   required: true,
  // },

  createdAt: {
    type: Date,

    default: Date.now,
  },
});

module.exports = mongoose.model("Announcement", announcementSchema);
