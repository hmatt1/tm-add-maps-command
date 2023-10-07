"use client";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const command =
    "/tmx add UID1 UID2 UID3 UID4 UID5 UID6 UID7 UID1 UID2 UID3 UID4 UID5 UID6 UID7 ...";

  const mapCount = 17;

  return (
    <main>
      <div className="min-h-screen flex flex-col items-center justify-start p-24">
        <input
          type="file"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs m-4"
          accept=".gbx"
          placeholder="Upload maps"
          multiple
        />
        <div className="">
          {isLoading ? (
            <span className="loading loading-dots loading-lg text-primary"></span>
          ) : (
            <div className="prose prose-slate lg:prose-lg w-full max-w-xs">
              <pre className="overflow-auto flex-1">
                <code>{command}</code>
              </pre>
            </div>
          )}
        </div>
        <div className="stats bg-primary m-4">
          <div className="stat">
            <div className="stat-title text-primary-content">Map Count</div>
            <div className="stat-value text-primary-content">{mapCount}</div>
          </div>
        </div>
        <button
          className="btn btn-outline btn-primary m-4"
          onClick={() => {
            setIsLoading(!isLoading);
          }}
        >
          Toggle Loading
        </button>
      </div>
    </main>
  );
}
