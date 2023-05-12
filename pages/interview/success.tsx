import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { TypoGraphy } from "@/components/ui/Typography";
import { Box } from "@mui/material";

const Success: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const fromConfirmation = localStorage.getItem("fromConfirmation");
    if (!fromConfirmation) {
      router.push("/interview"); // フラグがなければトップページにリダイレクト
    }
    localStorage.removeItem("fromConfirmation"); // フラグを削除
  }, []);

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
        <TypoGraphy variant="h5" title="応募が完了しました！" />
      </Box>
    </>
  );
};

export default Success;
