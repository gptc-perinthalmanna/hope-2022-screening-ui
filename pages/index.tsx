import * as React from "react";
import Layout from "../components/Layout";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <div className="bg-slate-900 text-white font-body h-screen">
        <section className="flex justify-center w-full">
          <div className="text-center">
            <Image src="/hope.png" width={200} height={200} />
            <p className="text-xl text-slate-200 font-body">Project Exhibition and Contest</p>
          </div>
        </section>
        <section className="text-center mt-14">
          <Link href="/view/0">
          <a className="rounded-lg bg-violet-700 hover:bg-opacity-80 border-white p-5 text-3xl font-black">View Registrations</a>
          </Link>
        </section>
      </div>
    </Layout>
  );
};

export default IndexPage;
