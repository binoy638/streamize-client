import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getTorrent } from "../API";
import TorrentInfo from "../components/TorrentInfo";

const Torrent: NextPage = () => {
  const router = useRouter();

  const [slug, setSlug] = useState("random");

  useEffect(() => {
    const { torrentSlug } = router.query;

    if (torrentSlug && typeof torrentSlug === "string") {
      setSlug(torrentSlug);
    }
  }, [router]);

  const { isError, isLoading, data } = useQuery(
    ["video", slug],
    () => getTorrent(slug),
    {
      refetchInterval: (data) => {
        if (data && data.status === "done") {
          return 0;
        } else return 5000;
      },
    }
  );

  return (
    <>
      <Head>
        <title>Streamize</title>
      </Head>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error</div>
        ) : (
          <div>{data && <TorrentInfo data={data} />}</div>
        )}
      </div>
    </>
  );
};

export default Torrent;
