import Prismic from "@prismicio/client";
import { Link } from "next/link";

export const Client = (req = null) =>
  Prismic.client(
    `https://${process.env.PRISMIC_REPO_NAME}.cdn.prismic.io/api/v2`,
    createClientOptions(req, process.env.PRISMIC_ACCESS_TOKEN)
  );

const createClientOptions = (req = null, prismicAccessToken = null) => {
  const reqOption = req ? { req } : {};
  const accessTokenOption = prismicAccessToken
    ? { accessToken: prismicAccessToken }
    : {};
  return {
    ...reqOption,
    ...accessTokenOption,
  };
};

const resolver = (doc, uid) => {
  if (doc.link_type === "Web") {
    return doc.url;
  }
  if (doc.type === "page") {
    return `/${uid}`;
  }
  if (doc.type === "blog-post") {
    return `/blog/${uid}`;
  }
  if (doc.type === "product") {
    return `/shop/${uid}`;
  }
  if (doc.type === "shop") {
    return "/shop";
  }
  if (doc.type === "blog-home") {
    return "/blog";
  }
  return "/";
};

export const linkResolver = (doc) => {
  return resolver(doc, doc.uid);
};

export const hrefResolver = (doc) => {
  return resolver(doc, "[uid]");
};

export const customLink = (type, element, content, children, index) => {
  <Link
    key={index}
    href={hrefResolver(element.data)}
    as={linkResolver(element.data)}
    passHref
  >
    <a>{content}</a>
  </Link>;
};
