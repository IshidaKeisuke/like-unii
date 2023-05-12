import "../styles/globals.css";
import type { AppProps } from "next/app";
import { liff } from "@line/liff";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [liffObject, setLiffObject] = useState<typeof liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);
  const liffId = process.env.NEXT_PUBLIC_LIFF_ID as string;
  const [isInClient, setIsInClient] = useState<boolean | null>(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    if (!liffId) {
      setLiffError("LIFF ID is not defined.");
      return;
    }

    // to avoid `window is not defined` error
    import("@line/liff")
      .then((liff) => liff.default)
      .then((liff) => {
        liff
          .init({ liffId })
          .then(() => {
            setLiffObject(liff);
            setIsInClient(liff.isInClient());

          })
          .catch((error: Error) => {
            setLiffError(error.toString());
          });
      });

  }, [liffId]);

  if (isInClient) {
    return <Component {...pageProps} liff={liffObject} liffError={liffError} />;
  } else {
    return <div>外部ブラウザからはアクセスできません。</div>;
  }

}

export default MyApp;
