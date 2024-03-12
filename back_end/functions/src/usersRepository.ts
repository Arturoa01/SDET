import Joi = require('@hapi/joi');

/*
 *
 * database model
 *
 * USER:
 *   collection name: 'users'
 *   object structure:
 *     {
 *       id: string,
 *       name: string,
 *       quizIds: string[]
 *     }
*/

interface User {
  id: string;
  name: string; // required - min length 1
  quizIds: string[];
  errors?: Joi.ValidationError; // optional filed - not persisted in the database
};

const userSchema = Joi.object({
  name: Joi.string()
    .min(1)
    .required()
});

export const listUsers = async (usersColl: any): Promise<User[]> => {
  return await usersColl.get()
    .then((querySnapshot: any) => {
      const users: User[] = [];

      querySnapshot.forEach((docRef: any) => {
        users.push({
          id: docRef.id,
          ...docRef.data()
        });
      });

      return users;
    });
};

export const getUser = async (usersColl: any, userId: string): Promise<User | undefined> => {
  return await usersColl.doc(userId).get()
    .then((docRef: any) => {
      if (!docRef.data().exists) {
        return undefined;
      }

      return {
        id: docRef.id,
        ...(docRef.data())
      };
    });
};

export const createUser = async (usersColl: any, params: any): Promise<User> => {
  const userValidation = userSchema.validate({ name: params.name })

  if (userValidation.error) {
    return {
      id: "",
      name: params.name,
      quizIds: [],
      errors: userValidation.error
    };
  }

  return await usersColl.add({
      name: userValidation.value.name,
      quizIds: []
    })
    .then((docRef: any) => {
      return {
        id: docRef.id,
        name: userValidation.value.name,
        quizIds: []
      };
    });
};

// Error handling in this function is not ideal. It should be improved. Can you update this and explain why?
export const deleteUser = async (usersColl: any, userId: string): Promise<User | undefined> => {
  return await usersColl.doc(userId).get()
    .then(async (docRef: any) => {
      if (docRef.exists) {
        try {
          await usersColl.doc(userId).delete();
          return { id: docRef.id, ...docRef.data() }
        }
        catch (error) {
          console.error("Error removing document: ", error);
          return undefined;
        }
      } else {
        return undefined;
      }
    });
};

// Error handling in this function is not ideal. It should be improved. Can you update this and explain why?
export const updateUser = async (usersColl: any, userId: string, params: any): Promise<User> => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const userValidation = userSchema.validate({ name: params.name })

  if (userValidation.error) {
    return {
      id: userId,
      name: params.name,
      quizIds: [],
      errors: userValidation.error
    };
  }

  const docRef = usersColl.doc(userId);

  return await docRef.update({
      name: userValidation.value.name
    })
    .then(async () => {
      const updatedDoc = await docRef.get()

      return {
        id: updatedDoc.id,
        ...updatedDoc.data()
      };
    });
};
