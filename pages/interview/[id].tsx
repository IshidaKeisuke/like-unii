import { NextPage } from "next";
import { Interview } from "@/types/index";
import { getInterviewById } from "@/utils/hasura/interview";
import { Typography } from "@mui/material";
import { Card, CardContent, Box } from "@mui/material";
import { BackButton } from "@/components/features/common/BackButton";
import { CustomButton } from "@/components/ui/CustomButton";
import Link from "next/link";

interface Props {
  interview: Interview;
}

interface Params {
  params: {
    id: number;
  };
}

const InterviewDetail: NextPage<Props> = ({ interview }) => {
  const { id, company_id, title, description, execution_time, price } = interview;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ maxWidth: 500, height: "55vh", margin: "auto" }}>
        <CardContent>
          <Typography variant="h5">{title}</Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">{description}</Typography>
          <Typography variant="body2" title={`面談時間: ${execution_time}分`} />
          <Typography variant="body2" title={`報酬: ${price}円`} />
          <BackButton />
          <Link href={{ pathname: `/interview/confirm/${id}`, query: { company_id: interview.company_id } }}>
            <CustomButton variant="contained" title={"応募する"} />
          </Link>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InterviewDetail;

export async function getServerSideProps({ params }: Params) {
  const { id } = params;
  try {
    const interview = await getInterviewById(id);
    return {
      props: {
        interview,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
