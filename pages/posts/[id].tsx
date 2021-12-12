// @ts-ignore "@mdx-js/mdx" is missing the official type definition
import compile from "@mdx-js/mdx";
import { MDXProvider } from "@mdx-js/react";
import * as fs from "fs";
import { MDXContent } from "mdx/types";
import { GetStaticPaths, GetStaticProps } from "next";
import path from "path";
import { ParsedUrlQuery } from "querystring";

// For `import { compile } from "@mdx-js/mdx";`
//declare function compile(mdxContent: string, opts?: object): MDXContent;

const postsDirectory = "./posts";

const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return { params: { id: fileName.replace(/\.md$/, "") } };
  });
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return { paths, fallback: false };
};

interface Props {
  mdxContent?: MDXContent;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  console.log("getStaticProps is called");
  if (params && params.id) {
    const fullPath = path.join(postsDirectory, params.id + ".md");
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const mdxContent: MDXContent = await compile(fileContents);

    return {
      props: {
        mdxContent,
      },
    };
  }
  return {
    props: {},
  };
};

const Post = ({ mdxContent }: Props): JSX.Element => {
  const components = {};
  console.log(mdxContent);
  return (
    <MDXProvider components={components}>
      <div>post</div>
    </MDXProvider>
  );
};

export default Post;
