import React from "react";
import { graphql } from "gatsby";

import { Post } from "../models/post";

import Layout from "../components/layout";
import Seo from "../components/seo";
import PostList from "../components/post";

export default function ({ data, location }: { data: QueryResult; location: any }) {
  const posts = React.useMemo<Post[]>(() => {
    return data.allMarkdownRemark.nodes.map((node) => ({
      title: node.frontmatter.title,
      description: node.frontmatter.description,
      tags: node.frontmatter.tags,
      url: node.fields.slug,
      publishedAt: node.frontmatter.date,
    }));
  }, [data]);
  return (
    <Layout location={location}>
      <Seo title="Home | blog.hoseung.me" />
      <PostList posts={posts} />
    </Layout>
  );
}

interface QueryResult {
  allMarkdownRemark: {
    nodes: {
      fields: {
        slug: string;
      };
      frontmatter: {
        title: string;
        date: string;
        description: string;
        tags: string[];
      };
    }[];
  };
}

export const pageQuery = graphql`
  query ($tag: String!) {
    allMarkdownRemark(filter: { frontmatter: { tags: { in: [$tag] } } }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "YYYY년 M월 D일")
          description
          tags
        }
      }
    }
  }
`;