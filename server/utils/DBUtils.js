import mongoose from 'mongoose';
import { ArticleModel } from '../models/article';

export const setupConnection = () => {
    mongoose.connect('mongodb://localhost/Articles');
};

export const getArticlesCount = async () => {
    const all = await ArticleModel.find();

    return all.length;
};

export const getArticleList = (params, page=0,articlesPerPage=5) => {
    const startDate = params.startDate ? new Date(params.startDate) : new Date("1851-09-18");
    const endDate = params.endDate ? new Date(params.endDate) : Date.now();
    const sortBy = params.sortBy || "creationDate";
    const headline = params.headline || "";
    const orderIncrease = params.orderIncrease || false;
    const sortObj= {};
    sortObj[sortBy] = orderIncrease==='true' ? 1 : -1;
    return ArticleModel.find({
        creationDate: {
            $gt: startDate,
            $lt: endDate
        }
    }).sort(sortObj).skip(page*articlesPerPage).limit(articlesPerPage)
};

export const addArticle = (data) => {
    const article = new ArticleModel({
        headline: data.headline || "some headline",
        lead: data.lead || "lead",
        abstract: data.abstract || `Lorem ipsum dolor sit amet, consectetur 
        adipisicing elit. Accusamus aliquid animi cupiditate delectus dolore eaque 
        earum eius, ipsum iste libero minima molestias necessitatibus nisi nulla 
        numquam odio omnis perferendis porro praesentium provident quae quas quo 
        reiciendis, rerum, sequi sint sit soluta temporibus vero voluptatum? Ab 
        ad ducimus neque perferendis voluptate.`,
        links: data.links || [],
        creationDate: data.creationDate || Date.now()
    });
    return article.save();
};

export const getArticleById = (id) => ArticleModel.findById(id);

export const removeArticleById = (id) => ArticleModel.findById(id).remove();