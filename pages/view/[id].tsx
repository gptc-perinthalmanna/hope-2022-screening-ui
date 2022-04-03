import { GetServerSideProps, NextPage } from "next";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { FaMailBulk, FaPhoneSquareAlt, FaRegUserCircle } from "react-icons/fa";
import { IoGitBranchSharp } from "react-icons/io5";
import { BiBuildings } from "react-icons/bi";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
type DataType = {
  name: string;
  email: string;
  phone: string;
  branch: string;
  college: string;
  topic: string;
  description: string;
  mentor: string;
  mentorEmail: string;
  mentorPhone: string;
  teamMembers: string;
  totalProjects: number;
  currentProjectId: number;
};

const DocumentPage: NextPage<{ data: DataType | null }> = ({ data }) => {
  const router = useRouter();
  return (
    <Layout>
      <div className="bg-slate-900 text-white font-body w-full h-screen px-5">
        <section className="flex items-center justify-between">
          <div>
            <button
              onClick={() =>
                router.push(
                  `/view/${data ? data?.currentProjectId - 1 : "unkown"}`
                )
              }
              className={`${
                data && !(data.currentProjectId > 0) && "hidden"
              } bg-indigo-700 text-sm text-white font-bold rounded-md py-2 px-5 border hover:bg-opacity-75 border-indigo-500`}
            >
              Previous
            </button>
          </div>
          <h1 className="text-md sm:text-xl md:text-2xl  lg:text-3xl xl:text-5xl py-3 font-black text-center">
            {data && data?.currentProjectId + 1} - {data?.topic}
          </h1>
          <div>
            <button
              onClick={() =>
                router.push(
                  `/view/${data ? data?.currentProjectId + 1 : "unkown"}`
                )
              }
              className={`${
                data &&
                data.currentProjectId + 1 >= data.totalProjects &&
                "hidden"
              } text-sm bg-indigo-700 text-white font-bold rounded-md py-2 px-5 border hover:bg-opacity-75 border-indigo-500`}
            >
              Next
            </button>
          </div>
        </section>
        <section className="font-thin pt-3 pb-5 flex justify-between items-center text-2xl font-body">
          <div className="flex font-normal items-center ">
            <FaRegUserCircle className="mr-2" />
            {data?.name}
          </div>
          <div className="flex items-center text-lg font-normal text-slate-300 border rounded-full px-3 ">
            <IoGitBranchSharp className="mr-2" />
            {data?.branch}
          </div>
        </section>
        <section className="font-thin pb-3 flex justify-between items-center text-2xl font-body">
          <div className="flex font-normal  items-center ">
            <BiBuildings className="mr-2 " />
            <span className=" text-base">{data?.college}</span>
          </div>
        </section>
        <section className="font-thin   pb-8 flex  items-center text-2xl font-body">
          <div className="flex items-center mr-3 ">
            <FaPhoneSquareAlt className="mr-2" />
            <span className=" text-base">{data?.phone}</span>
          </div>
          <div className="flex items-center  mr-3">
            <FaMailBulk className="mr-2" />
            <span className=" text-base">{data?.email}</span>
          </div>
        </section>
        <section>
          <h3 className="mx-3 text-slate-300 text-xl font-bold mt-5">
            Description
          </h3>
          <div className="m-3 border rounded-lg p-3 font-body text-xl leading-9">
            <p>{data?.description}</p>
          </div>
        </section>
        <div>
          <section className="my-8 text-md p-3 bg-slate-800 rounded-xl">
            <div>Mentor: {data?.mentor}</div>
            <div>Mentor Email: {data?.mentorEmail}</div>
            <div>Mentor Phone: {data?.mentorPhone}</div>
          </section>
          <section>
            <div>Team Members: {data?.teamMembers}</div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentPage;

export const getServerSideProps: GetServerSideProps<{
  data: DataType | null;
}> = async (context) => {
  if (!context.params?.id) return { notFound: true };
  const doc = new GoogleSpreadsheet(
    "12YA9DrJvsTj0__Ebh-TEhwVvmYnqB9UothEWLYq8ReU"
  );
  doc.useApiKey(process.env.GOOGLE_SHEETS_API_KEY || "");
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
  const row = await sheet.getRows();
  const currentRow = row[Number(context.params.id)];
  if (!currentRow) return {notFound: true}

  return {
    props: {
      data: {
        name: currentRow["Name of Participant / Team leader"],
        email: currentRow["Email"],
        phone: currentRow["Whatsapp No"],
        branch: currentRow["Branch or Programme"],
        college: currentRow["College"],
        topic: currentRow["Project Topic"],
        description: currentRow["Project Description"],
        mentor: currentRow["Mentor/Guide Name"],
        mentorEmail: currentRow["Mentor/Guide Email"],
        mentorPhone: currentRow["Mentor/Guide Contact No."],
        teamMembers: currentRow["Other Team Members"] || "No data",
        totalProjects: row.length,
        currentProjectId: Number(context.params.id),
      },
    },
  };
};
