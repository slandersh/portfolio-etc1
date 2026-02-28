// @ts-ignore
import { MDXRemote } from "next-mdx-remote/rsc";
// @ts-ignore
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import React from "react";
import type { ReactNode } from "react";
import { slugify as transliterate } from "transliteration";

import {
  Heading,
  Text,
  InlineCode,
  CodeBlock,
  Accordion,
  AccordionGroup,
  Table,
  Feedback,
  Button,
  Card,
  Grid,
  Row,
  Column,
  Icon,
  Media,
  SmartLink,
  List,
  ListItem,
  Line,
} from "@once-ui-system/core";
import type { TextProps, MediaProps, SpacingProps } from "@once-ui-system/core";
import { HeadingLink } from "./HeadingLink";

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("/")) {
    return (
      <SmartLink href={href} {...props}>
        {children}
      </SmartLink>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function createImage({ alt, src, ...props }: MediaProps & { src: string }) {
  if (!src) {
    console.error("Media requires a valid 'src' property.");
    return null;
  }

  return (
    <Media
      marginTop="8"
      marginBottom="16"
      enlarge
      radius="m"
      border="neutral-alpha-medium"
      sizes="(max-width: 960px) 100vw, 960px"
      alt={alt}
      src={src}
      {...props}
    />
  );
}

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }

  if (React.isValidElement(node) && node.props) {
    return extractText((node as React.ReactElement<{ children?: ReactNode }>).props.children);
  }

  return "";
}

function slugify(str: ReactNode): string {
  const text = extractText(str);
  const strWithAnd = text.replace(/&/g, " and "); // Replace & with 'and'
  return transliterate(strWithAnd, {
    lowercase: true,
    separator: "-", // Replace spaces with -
  }).replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  const level = Number.parseInt(as.replace("h", ""), 10) as 1 | 2 | 3 | 4 | 5 | 6;
  const CustomHeading = ({ children, ...props }: SpacingProps & { children: ReactNode }) => {
    const slug = slugify(children);
    return (
      <HeadingLink marginTop="24" marginBottom="12" id={slug} level={level} {...props}>
        {children}
      </HeadingLink>
    );
  };

  CustomHeading.displayName = `Custom${as.toUpperCase()}`;

  return CustomHeading;
}

function createParagraph({ children }: TextProps) {
  return (
    <Text
      style={{ lineHeight: "175%" }}
      variant="body-default-m"
      onBackground="neutral-medium"
      marginTop="8"
      marginBottom="12"
    >
      {children}
    </Text>
  );
}

function createInlineCode({ children }: { children: ReactNode }) {
  return <InlineCode>{children}</InlineCode>;
}

function createCodeBlock(props: React.ComponentPropsWithoutRef<"pre">) {
  const children = React.Children.toArray(props.children);
  const codeElement = children.find(
    (child) => React.isValidElement(child) && child.type === "code",
  ) as React.ReactElement | undefined;

  if (codeElement?.props) {
    const { className, children: codeChildren } = codeElement.props as {
      className?: string;
      children?: ReactNode;
    };
    const language = className?.replace("language-", "") || "text";
    const label = language.charAt(0).toUpperCase() + language.slice(1);

    return (
      <CodeBlock
        marginTop="8"
        marginBottom="16"
        codes={[
          {
            code: typeof codeChildren === "string" ? codeChildren : extractText(codeChildren),
            language,
            label,
          },
        ]}
        copyButton={true}
      />
    );
  }

  return <pre {...props} />;
}

function createList(as: "ul" | "ol") {
  return ({ children }: { children: ReactNode }) => <List as={as}>{children}</List>;
}

function createListItem({ children }: { children: ReactNode }) {
  return (
    <ListItem marginTop="4" marginBottom="8" style={{ lineHeight: "175%" }}>
      {children}
    </ListItem>
  );
}

function createHR() {
  return (
    <Row fillWidth horizontal="center">
      <Line maxWidth="40" />
    </Row>
  );
}

const components: Record<string, React.ElementType> = {
  p: createParagraph,
  h1: createHeading("h1"),
  h2: createHeading("h2"),
  h3: createHeading("h3"),
  h4: createHeading("h4"),
  h5: createHeading("h5"),
  h6: createHeading("h6"),
  img: createImage,
  a: CustomLink,
  code: createInlineCode,
  pre: createCodeBlock,
  ol: createList("ol"),
  ul: createList("ul"),
  li: createListItem,
  hr: createHR,
  Heading,
  Text,
  CodeBlock,
  InlineCode,
  Accordion,
  AccordionGroup,
  Table,
  Feedback,
  Button,
  Card,
  Grid,
  Row,
  Column,
  Icon,
  Media,
  SmartLink,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  return <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />;
}
