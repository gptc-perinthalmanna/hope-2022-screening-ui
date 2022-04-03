import { GetServerSideProps, NextPage } from "next";

const DocumentPage: NextPage = () => {
  return <div></div>;
};

export default DocumentPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...

  return {
    props: {
      // props for your component
    },
  };
};
