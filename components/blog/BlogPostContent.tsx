import ReactMarkdown from "react-markdown";

export function BlogPostContent({ content }: { content: string }) {
  return (
    <div className="prose-blog mt-8 space-y-4 text-base leading-[1.75] text-muted-foreground [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mt-2 [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-foreground">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
