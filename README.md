# JSONPlaceholder API - Supertest + Cucumber BDD

BDD API test framework for https://jsonplaceholder.typicode.com using Cucumber, TypeScript, Chai, and Supertest.

This is pure `supertest` HTTP client + `chai` assertions.

### **Tech Stack**
| Tool | Why |
| --- | --- |
| Cucumber JS | Gherkin BDD. Business-readable scenarios |
| TypeScript | Type safety for `CustomWorld` and step defs |
| Supertest | Lightweight HTTP client for API testing |
| Chai | BDD assertions: `.to.equal()`, `.to.be.an()` |
| AJV | JSON Schema validation for contract testing |

### **Project Structure**

```
**JASONPLACEHOLDERAPI/**
├── src/
│   ├── features/api/
│   │   └── postsApi.feature      # Gherkin scenarios
│   ├── step-definitions/api/
│   │   └── postsSteps.ts         # Step definitions using supertest
│   ├── support/
│   │   ├── CustomWorld.ts        # Cucumber World for state sharing
│   │   ├── schemaValidator.ts    # AJV validators for schemas
│   │   └── env.ts                # BaseURL config
│   └── schemas/                  # JSON Schema files
│       ├── post.schema.json
│       ├── postsArray.schema.json
│       └── user.schema.json
├── package.json
└── tsconfig.json
```

### **Key Design Decisions - Step 1**

1.  **No `apiClient.ts` wrapper**: We call `request(baseURL)` directly. Keeps baseline minimal. Wrapper can be added later if nedded.
2.  **`CustomWorld` for state**: No top-level `let response`. All state lives on `this.response` and `this.newPostData`. Required for Cucumber parallel runs.
3.  **`function() {}` not `() => {}`**: Cucumber needs `function` to bind `this = CustomWorld`. Arrow functions break state.
4.  **DocString for POST/PUT**: `with body:` steps use Gherkin `""" JSON """` blocks -> `docString: string` param.

### **Setup & Run**

1.  **Install dependencies**
    ```bash
    npm install
2. **Run all tests against DEV**
    ```bash
    npm run cucumber:dev

**Test Coverage**
features/api/postsApi.feature covers 7 CRUD scenarios:
1. GET /posts -> 100 posts + array schema
2. GET /posts/1 -> Single post schema 
3. POST /posts -> Create with docString body
4. PUT /posts/1 -> Update and validate title
5. DELETE /posts/1 -> 200 status
6. GET /users/1 -> Email format schema
7. POST /posts -> Contract test with Given/When/Then state flow


