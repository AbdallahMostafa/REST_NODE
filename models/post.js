const mongooese = require('mongoose');
const Schema = mongooese.Schema;

const postSchema = new Schema(
    {
        title:  {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    }, { timestamps: true }
);

module.exports = mongooese.model('Post', postSchema);