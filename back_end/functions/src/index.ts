import * as functions from 'firebase-functions';
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as express from "express";

import * as admin from "firebase-admin"

import { asyncHandler } from "./middleware"

import { getUser, listUsers, createUser, deleteUser, updateUser } from './usersRepository';

admin.initializeApp()

const Firestore = admin.firestore()
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", asyncHandler(async (request, response, next) => {
  response.send("alive 💪")
}));

const usersColl = Firestore.collection("users")

/*
 * create a user
 *
 *
 * ROUTE:
 *   POST /users
 *
 * expected body JSON:
 * {
 *   name: "Bob Builder"
 * }
 *
 * POST PARAMS VALIDATION:
 *   name: string, required, min length 1
 *
 *
 * EXPECTED RESPONSE:
 * JSON
 * {
 *   "user": {
 *     "id": "uAWoWFpknToBcdZ7GF59",
 *     "quizIds": [],
 *     "name": "Bob Builder"
 *     "errors": (optional) a Joi.ValidationError object
 *   }
 * }
 *
 */

app.post("/users",
  asyncHandler(async (request, response, _next): Promise<void> => {
    try {
      const user = await createUser(usersColl, request.body);

      if ('errors' in user && user.errors !== undefined) {
        console.log(user);
        response.status(400).json(user);
      } else {
        response.status(201).json({ user });
      }
    } catch (err) {
      response.status(500).json(err);
    }
  }));


/*
 * list all users (no pagination)
 *
 *
 * ROUTE:
 *   GET /users
 *
 * EXPECTED RESPONSE:
 * JSON
 * {
 *   "users": [
 *     {
 *       "id": "uAWoWFpknToBcdZ7GF59",
 *       "quizIds": [],
 *       "name": "Bob Builder"
 *     }
 *   ]
 * }
 *
 */
app.get("/users", asyncHandler(async (request, response, _next) => {
  try {
    const users = await listUsers(usersColl);
    response.status(200).json({ users });
  } catch (err) {
    response.status(500).json(err);
  }
}));

/*
 * get a user
 *
 *
 * ROUTE:
 *   GET /users/:userId
 *
 * EXPECTED RESPONSE:
 * JSON
 * {
 *   "user": {
 *     "id": "uAWoWFpknToBcdZ7GF59",
 *     "quizIds": [],
 *     "name": "Bob Builder"
 *   }
 * }
 *
 */
app.get("/users/:userId",
  asyncHandler(async (request, response, _next) => {
    try {
      const user = await getUser(usersColl, request.params.userId);

      if (user) {
        response.status(200).json({user: user});
      } else {
        response.status(404).json();
      }
    } catch (err) {
      response.status(500).json(err);
    }
  }));

/*
* delete a user
*
* ROUTE:
*   POST /users
*
* EXPECTED RESPONSE: -> The values of the object that was deleted
* JSON
* {
*   "user": {
*     "id": "uAWoWFpknToBcdZ7GF59",
*     "quizIds": [],
*     "name": "Bob Builder"
*   }
* }
*
*/
app.delete("/users/:userId", asyncHandler(async (request, response, _next) => {
  try {
    const user = await deleteUser(usersColl, request.params.userId);

    if (user) {
      response.status(200).json({user: user});
    } else {
      response.status(404).json();
    }
  } catch (err) {
    response.status(500).json(err);
  }
}));

/*
 * update a user
 *
 *
 * ROUTE:
 *   PUT /users/:userId
 *
 * expected body JSON:
 * {
 *   name: "Bob Builder"
 * }
 *
 * POST PARAMS VALIDATION:
 *   name: string, required, min length 1
 *
 *
 * EXPECTED RESPONSE:
 * JSON
 * {
 *   "user": {
 *     "id": "uAWoWFpknToBcdZ7GF59", <- must not change
 *     "quizIds": [],
 *     "name": "Bob Builder"
 *     "errors": (optional) a Joi.ValidationError object
 *   }
 * }
 *
 */

app.put("/users/:userId", asyncHandler(async (request, response, _next) => {
  try {
    const user = await updateUser(usersColl, request.params.userId, request.body);

    if ('errors' in user) {
      response.status(400).json(user);
    } else {
      response.status(200).json({ user });
    }
  } catch (err) {
    console.log(err);
    response.status(500).json(err);
  }

}));

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);
