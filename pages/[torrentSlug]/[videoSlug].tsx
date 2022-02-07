import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getVideoLink } from "../../API";
import Player from "../../components/VideoPlayer";

const Video: NextPage = () => {
  const router = useRouter();

  const [slugV, setSlugV] = useState("");

  const [slugT, setSlugT] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { videoSlug, torrentSlug } = router.query;

    if (videoSlug && typeof videoSlug === "string") {
      setSlugV(videoSlug);
    }
    if (torrentSlug && typeof torrentSlug === "string") {
      setSlugT(torrentSlug);
    }
  }, [router]);

  useEffect(() => {
    if (!!slugV && !!slugT) {
      setLoading(false);
    }
  }, [slugV, slugT]);
  useEffect(() => {
    console.log({ slugV, slugT, loading });
  }, [loading, slugV, slugT]);
  return (
    <>
      <Head>
        <title>Streamize</title>
      </Head>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <Player src={getVideoLink(slugT, slugV)} />
            <div>Title:</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Video;
