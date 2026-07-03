import { Given, When, Then } from '@cucumber/cucumber';
import request from 'supertest';
import { expect } from 'chai';
import { CustomWorld } from '../../support/world/CustomWorld';
import { validatePost, validatePostsArray, validateUser } from '../../support/schemaValidator';

const baseURL = 'https://jsonplaceholder.typicode.com';

Given('I have the API client ready', function(this: CustomWorld) {
  // Background: Nothing needed for supertest, baseURL is constant
});

When('I send GET request to {string}', async function(this: CustomWorld, endpoint: string) {
  this.response = await request(baseURL).get(endpoint);
});

When('I send POST request to {string} with body:', 
  async function(this: CustomWorld, endpoint: string, docString: string) {
    this.newPostData = JSON.parse(docString);
    this.response = await request(baseURL)
      .post(endpoint)
      .send(this.newPostData);
});

When('I send PUT request to {string} with body:', 
  async function(this: CustomWorld, endpoint: string, docString: string) {
    this.newPostData = JSON.parse(docString);
    this.response = await request(baseURL)
      .put(endpoint)
      .send(this.newPostData);
});

When('I send DELETE request to {string}', async function(this: CustomWorld, endpoint: string) {
  this.response = await request(baseURL).delete(endpoint);
});

Then('response status code should be {int}', function(this: CustomWorld, statusCode: number) {
  expect(this.response?.status).to.equal(statusCode);
});

Then('the response should contain {int} posts', function(this: CustomWorld, count: number) {
  const body = this.response?.body;
  expect(body).to.be.an('array').with.lengthOf(count);
  validatePostsArray(body); // AJV validation
});

Then('the response body should match post schema', function(this: CustomWorld) {
  validatePost(this.response?.body); // AJV validation
});

Then('response body title should be {string}', function(this: CustomWorld, title: string) {
  expect(this.response?.body.title).to.equal(title);
});

Then('the response body should match user schema', function(this: CustomWorld) {
  validateUser(this.response?.body); // AJV validation
});

// Scenario 7 specific steps
Given('I have a new post with userId {int}, title {string}, body {string}', 
  function(this: CustomWorld, userId: number, title: string, body: string) {
    this.newPostData = { userId, title, body };
});

When('I send a POST request to {string} with that post', async function(this: CustomWorld, endpoint: string) {
  this.response = await request(baseURL)
    .post('/posts')
    .send(this.newPostData);
});

Then('I should receive status code {int}', function(this: CustomWorld, statusCode: number) {
  expect(this.response?.status).to.equal(statusCode);
});