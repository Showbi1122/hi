type BlogHtmlContentProps = {
  html: string;
};

export function BlogHtmlContent({ html }: BlogHtmlContentProps) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
