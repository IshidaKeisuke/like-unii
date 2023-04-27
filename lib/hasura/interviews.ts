const graphqlEndpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT;
const adminSecret = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET;

export const getAllInterviews = async () => {
  if (!graphqlEndpoint || !adminSecret) {
    throw new Error('Hasura endpoint or admin secret is missing');
  }

  try {
    const query = `
      query GetAllInterviews {
        interviews {
          id
          companies_id
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

  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch interviews');
  }
};
