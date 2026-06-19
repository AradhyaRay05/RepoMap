interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const lines = content.split("\n");

  return (
    <div className="space-y-3">
      {lines.map((line, i) => {
        const trimmed = line.trim();

        if (!trimmed) return <div key={i} className="h-2" />;

        if (trimmed.startsWith("# ")) {
          return (
            <h1 key={i} className="font-manrope font-bold text-2xl text-gray-900 dark:text-white mt-6 mb-3">
              {renderInline(trimmed.replace(/^#\s+/, ""))}
            </h1>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={i} className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mt-5 mb-2">
              {renderInline(trimmed.replace(/^##\s+/, ""))}
            </h2>
          );
        }
        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={i} className="font-manrope font-semibold text-lg text-gray-800 dark:text-white/90 mt-4 mb-2">
              {renderInline(trimmed.replace(/^###\s+/, ""))}
            </h3>
          );
        }
        if (trimmed.startsWith("- **")) {
          const text = trimmed.replace(/^-\s+/, "");
          return (
            <div key={i} className="flex items-start gap-2 pl-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-purple mt-2 flex-shrink-0" />
              <span className="font-inter text-[15px] text-gray-600 dark:text-white/70 leading-relaxed">
                {renderInline(text)}
              </span>
            </div>
          );
        }
        if (trimmed.startsWith("- ")) {
          return (
            <div key={i} className="flex items-start gap-2 pl-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 flex-shrink-0" />
              <span className="font-inter text-[15px] text-gray-600 dark:text-white/70 leading-relaxed">
                {renderInline(trimmed.replace(/^-\s+/, ""))}
              </span>
            </div>
          );
        }
        if (/^\d+\./.test(trimmed)) {
          const match = trimmed.match(/^(\d+)\.\s+(.*)/);
          if (match) {
            return (
              <div key={i} className="flex items-start gap-3 pl-2">
                <span className="w-7 h-7 bg-brand-purple/20 text-brand-purple rounded-full flex items-center justify-center text-[12px] font-manrope font-bold flex-shrink-0">
                  {match[1]}
                </span>
                <span className="font-inter text-[15px] text-gray-600 dark:text-white/70 leading-relaxed pt-0.5">
                  {renderInline(match[2])}
                </span>
              </div>
            );
          }
        }

        return (
          <p key={i} className="font-inter text-[15px] text-gray-500 dark:text-white/60 leading-relaxed">
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(
        <strong key={match.index} className="font-semibold text-gray-800 dark:text-white/90">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 bg-white/[0.08] text-brand-purple/90 rounded text-[14px] font-mono"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}