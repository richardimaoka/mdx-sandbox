import { GetStaticPaths, GetStaticProps } from "next";
import * as fs from "fs";
import { MDXProvider } from "@mdx-js/react";

const getAllPostIds = () => {
  const fileNames = fs.readdirSync("./posts");

  return fileNames.map((fileName) => {
    return { params: { id: fileName.replace(/\.md$/, "") } };
  });
};

export const getStaticPaths: GetStaticPaths = async () => {
  console.log("getStaticPaths is called");
  const paths = getAllPostIds();
  console.log(paths);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log("getStaticProps is called");
  return { props: {} };
};

const Post = (): JSX.Element => {
  const components = {};

  return (
    <MDXProvider components={components}>
      <div>post</div>
    </MDXProvider>
  );
};

export default Post;
