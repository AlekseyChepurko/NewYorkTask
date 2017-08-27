import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    headline: {
        type: String,
        required: true },
    lead: {
        type: String,
        required: true },
    links: [{name: String, link: String}],
    tags: [String],
    abstract: String,
    creationDate: {
        type: Date,
        min: Date('1851-09-18'),
        max: Date.now,
        required: true,
    }
});

export const ArticleModel = mongoose.model('Articles', ArticleSchema);