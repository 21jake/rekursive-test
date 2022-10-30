import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import { Size } from '../typings';
import { customTestcases, defaultTestCases, invalidCases } from './cases';

chai.use(chaiHttp);

describe('Backend server', () => {
  it('Should be able to get products', async (done) => {
    chai
      .request(server)
      .get('/api/products')
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        chai.expect(res.body.success).to.be.true;
        [Size.SMALL, Size.MEDIUM, Size.LARGE].forEach((size) => {
          chai.expect(res.body.data[size]).to.be.an('object');
          chai.expect(res.body.data[size].description).to.be.a('string');
          chai.expect(res.body.data[size].price).to.be.a('number');
          chai.expect(res.body.data[size].size).to.be.a('string');
        });
      });
    done();
  });

  it('Should be able to pass default test cases', async (done) => {
    defaultTestCases.forEach((testCase) => {
      chai
        .request(server)
        .post('/api/checkout/apply-policies')
        .send(testCase)
        .end((err, res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res.body.success).to.be.true;
          chai.expect(res.body.data.total).to.be.equal(testCase.expectedTotal);
        });
    });
    done();
  });
  it('Should be able to pass custom test cases', async (done) => {
    customTestcases.forEach((testCase) => {
      chai
        .request(server)
        .post('/api/checkout/apply-policies')
        .send(testCase)
        .end((err, res) => {
          chai.expect(res).to.have.status(200);
          chai.expect(res.body.success).to.be.true;
          chai.expect(res.body.data.total).to.be.equal(testCase.expectedTotal);
        });
    });
    done();
  });

  it('Should validate and reject invalid request', async (done) => {
    invalidCases.forEach((testCase) => {
      chai
        .request(server)
        .post('/api/checkout/apply-policies')
        .send(testCase)
        .end((err, res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body.success).to.be.false;
        });
    })
    done();
  })
});
