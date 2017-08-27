import mongoose from 'mongoose';
import { ArticleModel } from '../models/article';


export const setupConnection = () => {
    mongoose.connect('mongodb://localhost/Articles');
};

export const getArticlesCount = async () => {
    const all = await ArticleModel.find();

    return all.length;
};

export const getArticleList = (offset, articlesPerPage=5) => ArticleModel.find();

export const addArticle = (data) => {
    const article = new ArticleModel({
        headline: data.headline || "some headline",
        lead: data.lead || "lead",
        links: data.links || [],
        creationDate: data.creationDate || Date.now()
    });
    return article.save();
};

export const removeArticleById = (id) => ArticleModel.findById(id).remove();