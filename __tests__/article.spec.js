const Article = require('../models/article');
const expect = require('chai').expect;

it('should return all the articles in the database', () => {
  Article.fetchAll((articles) => {
    expect(articles[0]).toBeInstanceOf(Article);
  });
});
