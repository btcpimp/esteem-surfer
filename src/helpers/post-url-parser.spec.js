import {postUrlParser} from './post-url-parser';
import {expect} from "chai";


describe('Post url parser', () => {

  it('should parse steemit post url', () => {
    const input = `https://steemit.com/esteem/@good-karma/upcoming-esteem-surfer-b911ad82fc8ef`;
    const expected = {author: 'good-karma', permlink: 'upcoming-esteem-surfer-b911ad82fc8ef'};
    expect(postUrlParser(input)).to.deep.equal(expected);
  });


  it('should parse busy post url', () => {
    const input = `https://busy.org/@good-karma/esteem-app-is-our-new-home-e4f6bfa9f0ceb`;
    const expected = {author: 'good-karma', permlink: 'esteem-app-is-our-new-home-e4f6bfa9f0ceb'};
    expect(postUrlParser(input)).to.deep.equal(expected);
  });

  it('Non url test', () => {
    const input = `@good-karma/esteem-app-is-our-new-home-e4f6bfa9f0ceb`;
    const expected = {author: 'good-karma', permlink: 'esteem-app-is-our-new-home-e4f6bfa9f0ceb'};
    expect(postUrlParser(input)).to.deep.equal(expected);
  });

  it('should return null', () => {
    const input = `upcoming-esteem-surfer-b911ad82fc8ef`;
    const expected = null;
    expect(postUrlParser(input)).to.deep.equal(expected);
  });

  it('should return null', () => {
    const input = `https://steemit.com/trending`;
    const expected = null;
    expect(postUrlParser(input)).to.deep.equal(expected);
  });

  it('should return null', () => {
    const input = `https://busy.org/trending/photography`;
    const expected = null;
    expect(postUrlParser(input)).to.deep.equal(expected);
  });

  it('should return null', () => {
    const input = `@good-karma`;
    const expected = null;
    expect(postUrlParser(input)).to.deep.equal(expected);
  });
});
