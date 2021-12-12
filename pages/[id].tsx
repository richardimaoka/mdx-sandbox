import { GetStaticPaths, GetStaticProps } from "next";
import * as fs from "fs";

const getAllPostIds = () => {
  const fileNames = fs.readdirSync("./posts");

  return fileNames.map((fileName) => {
    return { params: { id: fileName } };
  });
};

export const getStaticPaths: GetStaticPaths = () => {
  console.log("getStaticPaths is called");
  const paths = getAllPostIds();
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  console.log("getStaticProps is called");
  return { props: {} };
};

const Post = (): JSX.Element => {
  return <div>post</div>;
};

export default Post;
