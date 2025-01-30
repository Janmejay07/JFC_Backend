import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
    // No URL validation needed for local file paths
  },
  description: {
    type: [String], // Array of strings
    required: true,
    validate: {
      validator: function (v) {
        return v.length > 0; // Ensures at least one description is provided
      },
      message: "Description must have at least one item!",
    },
  },
});

const About = mongoose.model('About', aboutSchema);

export default About;
