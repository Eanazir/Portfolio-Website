import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CodeTypingAnimation = () => {
    const codeString = `
// My Secret Dev Diary
function dailyRoutine() {    
  // Debug process
  bugs = 99;
  while (bugs > 0) {
    // Easy fix
    bugs--;
    console.log("I am a GENIUS!");
    bugs+=2;
  }
  
  return "Will Google this again tomorrow";
}
// Why I code: Free snacks at meetups`;

    const [displayText, setDisplayText] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        if (currentIndex < codeString.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + codeString[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, Math.random() * 20 + 30); // Varying speed for realistic typing

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, codeString]);

    // Function to apply syntax highlighting to a line of code
    const highlightCode = (line: string) => {
        // Regex patterns for different code elements
        const commentPattern = /^(\s*\/\/.*$)/; // Comments
        const keywordPattern = /\b(function|const|let|var|while|if|return)\b/g; // Keywords
        const functionPattern = /\b(console\.log|Math|inZoomMeeting)\b/g; // Functions
        const stringPattern = /(["'])(.*?)\1/g; // Strings in quotes

        // Check if the entire line is a comment
        if (commentPattern.test(line)) {
            return <span className="text-green-400">{line}</span>;
        }

        // Build an array of highlighted segments
        let highlighted = [];
        let lastIndex = 0;
        let match;
        let tempLine = line;

        // First, handle strings (because they may contain keywords)
        while ((match = stringPattern.exec(tempLine)) !== null) {
            // Add text before the match
            if (match.index > lastIndex) {
                highlighted.push(
                    <span key={`pre-${match.index}`}>{tempLine.substring(lastIndex, match.index)}</span>
                );
            }

            // Add the matched string in orange
            highlighted.push(
                <span key={`string-${match.index}`} className="text-orange-400">
                    {match[0]}
                </span>
            );

            lastIndex = match.index + match[0].length;
        }

        // Add any remaining text
        if (lastIndex < tempLine.length) {
            highlighted.push(
                <span key={`remaining-${lastIndex}`}>{tempLine.substring(lastIndex)}</span>
            );
        }

        // If there were no strings, just use the original line
        if (highlighted.length === 0) {
            highlighted.push(<span key="original">{line}</span>);
        }

        // Now process the highlighted array to handle keywords and functions
        return highlighted.map((segment, i) => {
            if (typeof segment.props.children !== 'string' || segment.props.className) {
                return segment; // This is already a highlighted segment
            }

            // Highlight keywords and functions
            const text = segment.props.children as string;
            let result = text
                .replace(keywordPattern, match => `<keyword>${match}</keyword>`)
                .replace(functionPattern, match => `<function>${match}</function>`);

            if (result === text) {
                return segment; // No replacements made
            }

            // Split by custom markers and create spans
            const parts = result.split(/(<keyword>.*?<\/keyword>|<function>.*?<\/function>)/);

            return parts.map((part, j) => {
                if (part.startsWith('<keyword>')) {
                    return (
                        <span key={`kw-${i}-${j}`} className="text-blue-400">
                            {part.replace(/<\/?keyword>/g, '')}
                        </span>
                    );
                }
                if (part.startsWith('<function>')) {
                    return (
                        <span key={`fn-${i}-${j}`} className="text-yellow-400">
                            {part.replace(/<\/?function>/g, '')}
                        </span>
                    );
                }
                return part ? <span key={`text-${i}-${j}`}>{part}</span> : null;
            });
        });
    };

    return (
        <motion.div
            className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden shadow-xl h-[440px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* Mac OS style window controls */}
            <div className="flex items-center justify-start space-x-2 p-3 bg-gray-900 border-b border-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-2 text-xs text-gray-400">dev-diary.js</div>
            </div>

            <pre className="p-4 md:p-5 font-mono text-sm md:text-base text-white/90 whitespace-pre-wrap overflow-hidden">
                <code>
                    {displayText.split('\n').map((line, i, lines) => {
                        // Find the actual last line with content
                        const lastLineIndex = lines.map((l, idx) => ({ text: l, idx }))
                            .filter(item => item.text.trim().length > 0)
                            .pop()?.idx || 0;

                        // Check if this is the last line with content
                        const isLastContentLine = i === lastLineIndex;

                        // Check if this is the very last character in the displayText
                        const isAtLastPosition = currentIndex >= codeString.length;

                        return (
                            <div key={i} className="leading-relaxed">
                                {highlightCode(line)}
                                {/* Only show cursor at the end of the last non-empty line and if we're not done typing */}
                                {isLastContentLine && !isAtLastPosition && (
                                    <motion.span
                                        className="inline-block w-2 h-4 bg-[var(--accentColor)] align-middle"
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.8 }}
                                    />
                                )}
                            </div>
                        );
                    })}

                    {/* Show cursor at the very end only after all text is typed */}
                    {currentIndex >= codeString.length && (
                        <motion.span
                            className="inline-block w-2 h-4 bg-[var(--accentColor)] align-middle"
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                        />
                    )}
                </code>
            </pre>
        </motion.div>
    );
};

export default CodeTypingAnimation; 