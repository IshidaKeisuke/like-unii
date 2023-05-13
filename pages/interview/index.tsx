import { InterviewCard } from "@/components/features/interview/InterviewItem";
import { GetStaticProps, NextPage } from "next";
import { getAllInterviews } from "@/utils/hasura/interview";
import { Interview } from "@/types/index";

interface Props {
  interviews: Interview[];
}

const InterviewPage: NextPage<Props> = ({ interviews }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
      {interviews.map((interview) => (
        <InterviewCard key={interview.id} interview={interview} />
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const interviews = await getAllInterviews();
  return {
    props: {
      interviews,
    },
  };
};

export default InterviewPage;
