import Link from "next/link";
import React from "react";
import { IAddedTorrent } from "../../@types";

function index({ data }: { data: IAddedTorrent }) {
  return (
    <div>
      <div>{data.name}</div>
      <div>
        <div>Files</div>
        <div>
          {data.files.map((item) => {
            return (
              <div key={item.slug}>
                <Link
                  href={{
                    pathname: "/[torrentSlug]/[videoSlug]",
                    query: { torrentSlug: data.slug, videoSlug: item.slug },
                  }}
                  passHref
                >
                  {item.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default index;
