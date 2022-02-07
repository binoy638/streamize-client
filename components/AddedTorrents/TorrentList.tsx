import Link from "next/link";
import prettyBytes from "pretty-bytes";
import React from "react";
import { IAddedTorrent } from "../../@types";
import { prettyTime } from "../../utils";

function TorrentList({ data }: { data: IAddedTorrent[] }) {
  return (
    <div className="mt-4 lg:mt-6 overflow-hidden flex flex-col gap-4">
      {data.map((item) => {
        return (
          <div
            className="border-2 rounded cursor-pointer hover:bg-gray-50 pb-1 lg:pb-0"
            key={item.slug}
          >
            <div className="flex flex-col">
              {item.status === "added" ? (
                <div className="flex flex-col gap-2">
                  <div className="bg-blue-700 text-white">Torrent Added</div>
                  <div className="truncate">{item.magnet}</div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between">
                    <Link href={`/${item.slug}`} passHref>
                      <p className="truncate w-4/5 hover:underline">
                        {item.name}
                      </p>
                    </Link>
                    <p>{prettyBytes(item.size)}</p>
                  </div>
                  {item.downloadInfo && (
                    <>
                      {" "}
                      <div className="w-full bg-gray-200 rounded-full">
                        <div
                          className="bg-green-500 text-xs font-medium text-blue-100 text-center  leading-none "
                          style={{
                            width: `${Math.round(
                              item.downloadInfo.progress * 100
                            )}%`,
                          }}
                        >
                          {Math.round(item.downloadInfo.progress * 100)}%
                        </div>
                      </div>
                      <div className="hidden lg:flex justify-start gap-4 ">
                        <p>
                          Download:{" "}
                          {prettyBytes(item.downloadInfo.downloadSpeed)}
                          /s
                        </p>
                        <p>
                          Upload: {prettyBytes(item.downloadInfo.uploadSpeed)}/s
                        </p>
                        <p>
                          Time Remaining:
                          {prettyTime(item.downloadInfo.timeRemaining / 1000)}
                        </p>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TorrentList;
