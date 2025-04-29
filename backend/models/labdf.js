import mongoose from 'mongoose';
const lostPersonSchema = new mongoose.Schema(
  {
    description: String,
    number: String,
    imageUrl: String,
    imageId: String,
  },
  { timestamps: { createdAt: true, updatedAt: false } } 
);

const LostPerson = mongoose.model('LostPerson', lostPersonSchema);

export default LostPerson;




// const lostPersonSchema = new mongoose.Schema({
//     description: String,
//     number: String,
//     imageUrl: String,
//     imageId: String,
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
// });

// // Create TTL index to delete documents 30 days after creation
// lostPersonSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2 * 60 });

// const LostPerson = mongoose.model('LostPerson', lostPersonSchema);

// export default LostPerson;
