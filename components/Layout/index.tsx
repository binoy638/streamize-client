import Link from 'next/link';
import React from 'react';

function index({ children }: { children: React.ReactNode }) {
  return (
    <section className="px-4 py-4 lg:pt-6 bg-background h-screen w-screen">
      <header className="font-balsamiqSans text-5xl font-bold flex justify-center">
        <Link href={'/'} passHref>
          <h1 className="cursor-pointer text-primaryText hover:opacity-75">
            Streamize
          </h1>
        </Link>
      </header>

      <main className="pt-4 md:px-10 lg:px-56 lg:pt-10 font-lato text-secondaryText">
        {children}
      </main>
    </section>
  );
}

export default index;
