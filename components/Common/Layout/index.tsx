import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

function index({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Streamize</title>
      </Head>
      <section className="px-4 py-4 lg:pt-6  h-screen w-screen overflow-hidden">
        <header className="font-balsamiqSans text-5xl font-bold flex justify-center">
          <Link href={'/'} passHref>
            <a className="cursor-pointer  text-primary  hover:opacity-75">
              Streamize
            </a>
          </Link>
        </header>

        <main className="pt-4  md:px-10 lg:px-56 lg:pt-10 font-lato overflow-hidden ">
          {children}
        </main>
      </section>
    </>
  );
}

export default index;
