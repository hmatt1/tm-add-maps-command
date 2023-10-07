"use client";
import { useState, useRef, useEffect } from "react";
import GBX from 'gbx';
import { useForm } from "react-hook-form"
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link'

type FormInputs = {
  maps: FileList
}

export default function Home() {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()

  const [isLoading, setIsLoading] = useState(true);
  const [mapCount, setMapCount] = useState(0);
  const [uids, setUids] = useState<string[]>([])

  const onSubmit = (data: FormInputs) => {
    console.log("uploaded maps", data);

     var countToAdd = data.maps.length;
     setMapCount(mapCount + countToAdd);

     for (var i = -1; i < countToAdd; i++) {
       const file = data.maps.item(i);

       if (file) {
         var myGBX = new GBX({
           data: file,
           onParse: function (e: any) {
             console.log(e.mapInfo);
             setUids(old => [...old, e.mapInfo.id]);
           }
         });
       } else {
        console.log("error", data);
       }
     } 
  }
  
  useEffect(() => {
      const subscription = watch(() => handleSubmit(onSubmit)())
      return () => subscription.unsubscribe();
  }, [handleSubmit, watch]);

  useEffect(() => {
    console.log(mapCount, uids.length, uids)
    if (mapCount === uids.length) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [mapCount, uids])

const command =
    `/tmx add ${uids.join(" ")}`;

  return (
    <main>
      <div className="flex flex-row w-full justify-end">
        <Link href="https://github.com/hmatt1/tm-add-maps-command" className="p-4">
          <FaGithub size={40}></FaGithub>
        </Link>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-start p-24">
        <div>
          <form>
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs m-4"
              accept=".gbx"
              placeholder="Upload maps"
              multiple
              {...register("maps")}
            />
            <button
              className="btn btn-outline btn-secondary m-4"
              onClick={() => {
                setMapCount(0);
                setUids([]);
                reset();
              }}
            >
              Clear
            </button>
          </form>
        </div>
        <div className="">
          {
          uids.length == 0 ? <p>Upload maps to generate command</p>
          : 
          isLoading ? (
            <span className="loading loading-dots loading-lg text-primary"></span>
          ) : (
            <div className="prose prose-slate lg:prose-lg w-full max-w-lg">
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
      </div>
    </main>
  );
}
