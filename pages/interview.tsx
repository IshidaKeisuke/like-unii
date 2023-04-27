import { InterviewCard } from "@/components/interview/InterviewItem";
import { NextPage } from "next";
import { getAllInterviews } from "@/lib/hasura/interviews";
import { Interview } from "@/types/index";

interface Props {
  interviews: Interview[];
}

const Interview: NextPage<Props> = ({ interviews }) => {
  return(
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
      {interviews.map(interview => (
        <InterviewCard key={interview.id} interview={interview} />
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const interviews = await getAllInterviews();
  return {
    props: { interviews },
  };
}

export default Interview;
