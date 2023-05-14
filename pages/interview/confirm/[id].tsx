import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import liff from "@line/liff";
import { Interview, User } from "@/types/index";
import { TypoGraphy } from "@/components/ui/Typography";
import { Card, CardContent, Box } from "@mui/material";
import { BackButton } from "@/components/features/common/BackButton";
import { CustomButton } from "@/components/ui/CustomButton";
import { createUser, getUserByLineId } from "@/utils/hasura/user";
import { getInterviewById } from "@/utils/hasura/interview";
import { createMatch } from "@/utils/hasura/match";

interface Props {
  interview: Interview;
  liff: typeof liff;
  liffError: string | null
}

interface Params {
  params: {
    id: number;
  };
}

const InterviewConfirm: NextPage<Props> = ({liff, interview}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [lineId, setLineId] = useState<User["line_id"]>("");
  const { company_id } = interview;
  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID as string });
        const profile = await liff.getProfile();
        setLineId(profile.userId);
      } catch (error) {
        console.error(error);
      }
    };
    initializeLiff();
  }, [router, liff]);

  const handleApply = async () => {
    setIsLoading(true);
    let existingUserId: number | null
    try {
      existingUserId = await getUserByLineId(lineId);
      if (existingUserId == null) {
        await createUser(lineId);
        existingUserId = await getUserByLineId(lineId);
      }
      if (existingUserId != null) {
        await createMatch(existingUserId, company_id as number)
      }

      localStorage.setItem("fromConfirmation", "true"); // 応募の確認画面から遷移したことを示すフラグを保存
      router.push("/success"); // 応募完了画面に遷移
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
            <TypoGraphy variant="h5" title={interview.title} />
            <TypoGraphy
              sx={{ mb: 1.5 }}
              color="text.secondary"
              title={interview.description}
            />
            <TypoGraphy
              variant="body2"
              title={`報酬: ${interview.price}円`}
            />
            <BackButton />
            <CustomButton
              variant="contained"
              title={isLoading ? "応募中..." : "応募する"}
              disabled={isLoading}
              onClick={handleApply}
            />
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default InterviewConfirm;

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
  };
};
