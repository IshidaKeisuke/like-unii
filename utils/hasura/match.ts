import { graphqlEndpoint, adminSecret } from "@/utils/consts/index";
import { Match } from "@/types/index";

export const createMatch = async (userId: number, companyId: number): Promise<Match> => {
  const response = await fetch(graphqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': adminSecret
    },
    body: JSON.stringify({
      query: `
        mutation ($userId: Int!, $companyId) {
          insert_matches_one(object: {user_id: $userId, company_id: $companyId}) {
            id
            user_id
						company_id
						status
            created_at
          }
        }
      `,
      variables: {
        userId,
				companyId
      }
    })
  });

	const { data, errors } = await response.json();

  if (errors) {
    throw new Error(errors[0].message);
  }

	return data.insert_matches_one
}
