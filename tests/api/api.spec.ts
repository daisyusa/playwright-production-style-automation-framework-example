import { test, expect } from '@playwright/test';

test('GET a post @regression', async ({ request }) => {
  const response = await request.get('/posts/1');
  const post = await response.json();

  expect(response.status()).toBe(200);
  expect(post).toMatchObject({
    userId: 1,
    id: 1,
    title: expect.any(String),
    body: expect.any(String),
  });
});

test('GET posts filtered by user @regression', async ({ request }) => {
  const response = await request.get('/posts', {
    params: { userId: 1 },
  });
  const posts = await response.json();

  expect(response.status()).toBe(200);
  expect(posts.length).toBeGreaterThan(0);
  expect(posts.every((post: { userId: number }) => post.userId === 1)).toBe(true);
});

test('POST creates a post response @regression', async ({ request }) => {
  const newPost = {
    userId: 1,
    title: 'Playwright API test',
    body: 'Example post body',
  };

  const response = await request.post('/posts', { data: newPost });
  const post = await response.json();

  expect(response.status()).toBe(201);
  expect(post).toMatchObject({ ...newPost, id: 101 });
});

test('PATCH updates a post response @regression', async ({ request }) => {
  const updatedTitle = 'Updated with Playwright';
  const response = await request.patch('/posts/1', {
    data: { title: updatedTitle },
  });
  const post = await response.json();

  expect(response.status()).toBe(200);
  expect(post).toMatchObject({
    userId: 1,
    id: 1,
    title: updatedTitle,
    body: expect.any(String),
  });
});

test('DELETE returns a successful response @regression', async ({ request }) => {
  const response = await request.delete('/posts/1');

  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({});
});


/*

The following test is an example of how to create and delete an article using some API site.
It demonstrates the use of authentication tokens and making multiple API requests in a single test.

import { test, expect } from '@playwright/test';

let authToken: string;
const uid = Date.now();

test.beforeAll('Run before all',async ({ request }) => {
  const tokenResponse = await request.post('some API site baseURL/api/users/login', {
    data: { "user": {"email": "asapiuser@test.com","password": "asapiuser"}}
  })
  const tokenResponseJson = await tokenResponse.json();
  authToken = 'Token ' + tokenResponseJson.user.token;
});

test('Create and Delete Article', async ({request}) => {
  const title = `Rings of Power Test ${uid}`;
  const newArticleResponse = await request.post('some API site baseURL/api/articles', {
    data: {
    "article": {
        "title": title,
        "description": "About how rings can bring you power in Lord of the Rings",
        "body": "It's fairy tale about rings of power in the imaginary World",
        "tagList": []
    }
}, 
    headers: {
      Authorization: authToken
    }
  })
  const newArticleResponseJson = await newArticleResponse.json();

  expect(newArticleResponse.status()).toEqual(201)
  expect(newArticleResponseJson.article.title).toEqual(title)
  expect(newArticleResponseJson.article.description).toEqual('About how rings can bring you power in Lord of the Rings')
  expect(newArticleResponseJson.article.body).toEqual("It's fairy tale about rings of power in the imaginary World")

  const slugid = newArticleResponseJson.article.slug

  const articlesResponse = await request.get('some API site baseURL/api/articles?limit=1&offset=0', {
    headers: {
      Authorization: authToken
    }
  })
  const articlesResponseJson = await articlesResponse.json();
  expect(articlesResponse.status()).toEqual(200)
  expect(articlesResponseJson.articles[0].title).toEqual(title)

  const deleteArticleResponse = await request.delete(`some API site baseURL/api/articles/${slugid}`, {
    headers: {
      Authorization: authToken
    }
  })

});
*/