import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import postSchema from '../schemas/post.schema.json';
import postsArraySchema from '../schemas/postsArray.schema.json';
import userSchema from '../schemas/user.schema.json';
import newPostSchema from '../schemas/newPost.schema.json';

// 1 AJV instance for whole test suite
export const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

// Register all base schemas that use $ref
ajv.addSchema(postSchema, 'post.schema.json');
ajv.addSchema(userSchema, 'user.schema.json');

// Export compiled validators so steps stay clean
export const validatePost = ajv.compile(postSchema);
export const validatePostsArray = ajv.compile(postsArraySchema);
export const validateUser = ajv.compile(userSchema);
export const validateNewPost = ajv.compile(newPostSchema);

// HELPER - one function to rule them all
export function validateSchema(validator: any, data: any, schemaName: string) {
    const valid = validator(data);
    if (!valid) {
        const errors = ajv.errorsText(validator.errors, { separator: '\n  - ' });
        throw new Error(`${schemaName} validation failed:\n  - ${errors}`);
    }
}