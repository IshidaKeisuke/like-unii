import { Interview } from "@/types/index";
import { graphqlEndpoint, adminSecret } from "@/utils/consts/index";

export const getAllInterviews = async (): Promise<Interview[]> => {
  const query = `
    query GetAllInterviews {
      interviews {
        id
        title
        description
        execution_time
        price
        start_time
        end_time
      }
    }
  `;

  const response = await fetch(graphqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': adminSecret,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch interviews');
  }

  const data = await response.json();

  if (!data || !data.data || !data.data.interviews) {
    throw new Error('Invalid response data');
  }

  return data.data.interviews;
};

export const getInterviewById = async (id: number): Promise<Interview> => {
  const query = `
    query getInterviewById($id: Int!) {
      interviews_by_pk(id: $id) {
        id
        company_id
        title
        description
        execution_time
        price
        start_time
        end_time
      }
    }
  `;

  const response = await fetch(graphqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': adminSecret,
    },
    body: JSON.stringify({
      query,
      variables: { id },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch interview');
  }

  const data = await response.json();

  if (!data || !data.data || !data.data.interviews_by_pk) {
    throw new Error('Invalid response data');
  }

  return data.data.interviews_by_pk;
};
