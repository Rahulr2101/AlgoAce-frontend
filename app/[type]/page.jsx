"use client";
import React, { useEffect, useState } from "react";
import { getQuestionByType } from "@app/api/problems/problems";
import Link from "next/link";
import { CheckboxLabel } from "@components/checkBoxLabel";
import Navbar from "@components/nav";
import LoadingScreen from "@components/loadingScreen";
import { motion, AnimatePresence } from "framer-motion";

const Page = ({ params }) => {
  const [problems, setProblems] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuestionByType(params.type).then((res) => {
      setProblems(res.data);
      setTimeout(() => setLoading(false), 600);
    });
  }, [params.type]);

  const difficultyClasses = {
    Easy: "text-green-500",
    Medium: "text-yellow-500",
    Hard: "text-red-500",
  };

  const filteredProblems = problems.filter((problem) => {
    if (type === "Easy") return problem.difficulty === "Easy";
    if (type === "Medium") return problem.difficulty === "Medium";
    if (type === "Hard") return problem.difficulty === "Hard";
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center flex-grow"
          >
            <LoadingScreen />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className=""
          >
            <Navbar className="sticky top-0 z-10" />

            {/* Title Section */}
            
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 h-24 md:h-36 flex justify-center items-center p-4">
              <h1 className="text-2xl md:text-4xl text-center font-normal">
                {problems[0]?.typeName}
              </h1>
            </div>
            <div className="flex justify-center">
            {/* Main Content */}
            <div className="flex flex-col-reverse md:flex-row justify-center gap-10 p-4">
              {/* Problem List */}
              <div className="flex flex-col items-center gap-4 w-full md:w-3/4">
                {filteredProblems.map((problem, index) => (
                  <Link href={`/problem/${problem._id}`} key={index}>
                    <div className="flex items-center bg-gray-800 border border-gray-700 hover:shadow-xl transition-shadow duration-300 p-4 rounded-2xl h-auto md:h-28 shadow-lg w-full md:w-[600px]">
                      <div className="flex flex-grow flex-row justify-between items-center gap-2">
                        <div>
                          <h2 className="text-lg md:text-xl mb-2 font-normal">
                            {problem.title}
                          </h2>
                          <div className="text-sm font-normal">
                            <span
                              className={`text-center ${difficultyClasses[problem.difficulty]}`}
                            >
                              {problem.difficulty}
                            </span>
                            , Array
                          </div>
                        </div>
                        <button className="bg-transparent border-[0.1px] w-24 md:w-32 h-10 md:h-12 rounded-2xl border-gray-300 hover:bg-gray-700">
                          <h1 className="font-thin text-sm md:text-base">
                            Solve Challenge
                          </h1>
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Filters Section */}
              <div className="flex flex-col gap-4 w-full md:w-1/4">
                <div className="space-y-2">
                  <h1 className="text-slate-300 text-lg md:text-xl">STATUS</h1>
                  <CheckboxLabel text={"Solved"} />
                  <CheckboxLabel text={"Unsolved"} />
                </div>
                <div className="border-[0.1px] border-slate-400"></div>
                <div className="space-y-2">
                  <h1 className="text-slate-300 text-lg md:text-xl">DIFFICULTY</h1>
                  <CheckboxLabel text={"Easy"} onClick={() => setType("Easy")} />
                  <CheckboxLabel text={"Medium"} onClick={() => setType("Medium")} />
                  <CheckboxLabel text={"Hard"} onClick={() => setType("Hard")} />
                </div>
              </div>
              </div>
            </div>
  
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;
