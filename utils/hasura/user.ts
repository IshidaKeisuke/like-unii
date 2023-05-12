import { graphqlEndpoint, adminSecret } from "@/utils/consts/index";
import { User } from "@/types/index";

export const createUser = async (lineId: string): Promise<User> => {
  const response = await fetch(graphqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': adminSecret
    },
    body: JSON.stringify({
      query: `
        mutation ($lineId: String!) {
          insert_users_one(object: {line_id: $lineId}) {
            id
            line_id
            created_at
          }
        }
      `,
      variables: {
        lineId
      }
    })
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(errors[0].message);
  }

  return data.insert_users_one;
}

export const getUserByLineId = async (lineId: string): Promise<number | null> => {

  const query = `
    query getUserIdByLineId($lineId: String!) {
      users(where: { line_id: { _eq: $lineId } }) {
        id
      }
    }
  `;
  
  const response = await fetch(graphqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": adminSecret,
    },
    body: JSON.stringify({
      query,
      variables: { lineId },
    }),
  });

  const data = await response.json();

  if (!data || !data.data || !data.data.users || data.data.users.length === 0) {
    return null;
  }

  return data.data.users[0].id;
};
