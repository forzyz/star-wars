import React, { Suspense } from "react";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import BackBtn from "../../components/BackBtn";
import HeroCard from "../../components/HeroCard";
import { getHeros } from "../services/heros/heros";
import Loading from "./loading";

// Define types for props
type HerosPageProps = {
  searchParams: {
    page: string;
    search: string;
  };
};

// Fetch data function
const fetchData = async (page: string, search: string) => {
  try {
    const response = await getHeros(page, search);
    return response;
  } catch (error: any) {
    throw error;
  }
};

// Main component
const HerosPage: React.FC<HerosPageProps> = async ({
  searchParams: { page, search },
}) => {
  // Fetch the hero data
  const data = await fetchData(page, search);

  // Handle no data case
  
  if (!data) {
    return (
      <h1 className="text-2xl font-bold leading-10 tracking-tight bg-clip-text text-transparent bg-secondary">
        Ups
      </h1>
    );
  }

  // Extract response and calculate total pages
  const { results: heros, count } = data;
  const totalPages = Math.ceil(count / 10);

  // Render the component
  return (
    <main className="h-screen flex flex-col items-center justify-between">
      <BackBtn />
      <Search />
      <Suspense fallback={<Loading />}>
        {!!heros.length ? (
          <>
            <ul className="grid grid-cols-2 gap-8 py-24 md:grid-cols-2 md:py-56 lg:grid-cols-5">
              {heros.map((hero) => (
                <li key={hero.name}>
                  <HeroCard
                    hero={hero}
                    page={page || "1"}
                    search={search || ""}
                  />
                </li>
              ))}
            </ul>
            <Pagination totalPages={totalPages} curPage={page} />
          </>
        ) : (
          <h1 className="text-3xl my-auto text-purple">No such heros</h1>
        )}
      </Suspense>
    </main>
  );
};

export default HerosPage;
