Feature: JSONPlaceholder Post API

    Background: Setup API Client
        Given I have the API client ready

    Scenario: 1. Get all posts
        When I send GET request to "/posts"
        Then response status code should be 200
        And the response should contain 100 posts

    Scenario: 2. Get single post by ID
        When I send GET request to "/posts/1"
        Then response status code should be 200
        And the response body should match post schema

    Scenario: 3. Create a new post
        When I send POST request to "/posts" with body:
            """
            {
                "title": "BF CRUD test",
                "body": "Testing POST using strict env",
                "userId": 1
            }
            """
        Then response status code should be 201
        And response body title should be "BF CRUD test"

    Scenario: 4. Update a post
        When I send PUT request to "/posts/1" with body:
            """
            {
                "id": 1,
                "title": "Updated title",
                "body": "Updated body",
                "userId": 1
            }
            """
        Then response status code should be 200
        And response body title should be "Updated title"

    Scenario: 5. Delete a post
        When I send DELETE request to "/posts/1"
        Then response status code should be 200

    Scenario: 6. Get single user and validate email format
        When I send GET request to "/users/1"
        Then response status code should be 200
        And the response body should match user schema

    Scenario: 7. Create a new post and validate request + response
        Given I have a new post with userId 1, title "Contract Testing", body "AJV is powerful"
        When I send a POST request to "/posts" with that post
        Then I should receive status code 201
        And the response body should match post schema
