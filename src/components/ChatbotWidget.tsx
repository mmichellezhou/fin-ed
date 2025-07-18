import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Bot } from "lucide-react"; // MessageCircle is removed as it's no longer used for the trigger

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Effect to load the Pickaxe.co embed script when the chatbot opens
  useEffect(() => {
    if (typeof window !== "undefined" && isOpen) {
      const scriptId = "pickaxe-script";
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.src = "https://studio.pickaxe.co/api/embed/bundle.js";
        script.defer = true;
        script.id = scriptId;
        document.body.appendChild(script);
      }
    }
  }, [isOpen]);

  // Effect to find and apply the ombre border to the Pickaxe.co button
  useEffect(() => {
    if (typeof window !== "undefined") {
      const applyOmbreToPickaxeButton = () => {
        let actualPickaxeButton = null;

        // --- START: CUSTOMIZATION REQUIRED HERE ---
        // You MUST inspect your live page's DOM to find the correct selector for the Pickaxe.co button.
        // It's often a button with specific attributes or classes added by their script.

        // Common patterns to try (uncomment/adjust based on your DOM inspection):
        // 1. A button with a specific data attribute (e.g., used by many embed widgets):
        actualPickaxeButton = document.querySelector(
          '[data-pickaxe-button="true"]'
        );

        // 2. A button with a common class name from the embed:
        if (!actualPickaxeButton) {
          actualPickaxeButton = document.querySelector(
            ".pickaxe-widget-button"
          );
        }
        if (!actualPickaxeButton) {
          actualPickaxeButton = document.querySelector(
            ".pickaxe-embed-trigger"
          );
        }

        // 3. An element containing an SVG or Image that looks like the pickaxe:
        //    (This might be the pickaxe icon's direct parent, assuming it's the button)
        if (!actualPickaxeButton) {
          const svgs = document.querySelectorAll("svg");
          for (let i = 0; i < svgs.length; i++) {
            // Adjust this check based on actual SVG content or attributes
            // Example: if the SVG has a title, id, or specific path data
            if (
              svgs[i].outerHTML.includes(
                "M19.98 12.02L22 10l-2-2-2.02 2.02L16 6l-2-2-2 2-2.02-2.02L8 4l-2 2-2.02-2.02L2 6l2 2-2 2 2 2 2-2 2.02 2.02L8 16l2 2 2 2 2.02-2.02L16 20l2-2 2.02 2.02z"
              )
            ) {
              // Check if the parent is a button or a suitable container
              if (
                svgs[i].parentElement &&
                (svgs[i].parentElement.tagName === "BUTTON" ||
                  svgs[i].parentElement.tagName === "DIV")
              ) {
                actualPickaxeButton = svgs[i].parentElement;
                break;
              }
            }
          }
        }
        // If the Pickaxe button is a plain img inside a div (less common for a clickable button):
        if (!actualPickaxeButton) {
          const imgs = document.querySelectorAll('img[src*="pickaxe"]'); // Finds img tags with "pickaxe" in src
          if (
            imgs.length > 0 &&
            imgs[0].parentElement &&
            (imgs[0].parentElement.tagName === "BUTTON" ||
              imgs[0].parentElement.tagName === "DIV")
          ) {
            actualPickaxeButton = imgs[0].parentElement;
          }
        }

        // The image shows the button at the very bottom right, often added to `body`.
        // Look directly within `document` or `document.body` for the button element.

        // Example for testing:
        // actualPickaxeButton = document.querySelector('.bottom-right-fixed-pickaxe-button'); // Replace with actual class/id
        // --- END: CUSTOMIZATION REQUIRED HERE ---

        if (
          actualPickaxeButton &&
          !actualPickaxeButton.classList.contains("ombre-border-outline")
        ) {
          actualPickaxeButton.classList.add("ombre-border-outline");
          // You might need to adjust its z-index if it's still being covered by other elements.
          // actualPickaxeButton.style.zIndex = '1000'; // Ensure it's above other elements if needed
          console.log("Ombre border applied to pickaxe button.");
        }
      };

      // Use a MutationObserver to watch for when the pickaxe button is added to the DOM.
      // This is crucial because the embed script loads asynchronously.
      const observer = new MutationObserver(
        (mutationsList, observerInstance) => {
          applyOmbreToPickaxeButton();
          // Optionally disconnect the observer once the element is found and styled
          // If the element might be re-rendered or removed/added, keep the observer active.
          // For a fixed floating button, disconnecting after it's found is efficient.
          // if (document.querySelector('.ombre-border-outline')) {
          //   observerInstance.disconnect();
          // }
        }
      );

      // Start observing the document body for changes in its children (nodes added/removed)
      // and changes within the subtree (attributes, text content etc.)
      observer.observe(document.body, { childList: true, subtree: true });

      // Also attempt to apply immediately in case it's already there
      applyOmbreToPickaxeButton();

      // Clean up the observer when the component unmounts
      return () => observer.disconnect();
    }
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return (
    <>
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-96 h-[32rem] flex flex-col z-50 shadow-xl">
          <div className="flex items-center justify-between px-4 py-2 bg-primary text-primary-foreground border-b rounded-t">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="text-sm font-semibold">Money Helper</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-hidden p-2">
            {/* This is the container for the Pickaxe.co chatbot interface */}
            <div
              id="deployment-f2585422-eeb0-46ec-aad0-59e1946eb1f7"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </Card>
      )}

      {/* The original MessageCircle button is removed as per your last statement
          that it's "useless" and the Pickaxe.co embed provides its own button.
      */}
    </>
  );
};

export default ChatbotWidget;

///////// PICKAXE BUT WRONG
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { MessageCircle, X, Bot } from "lucide-react";

// const ChatbotWidget = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     // Only run in browser
//     if (typeof window !== "undefined" && isOpen) {
//       const scriptId = "pickaxe-script";
//       if (!document.getElementById(scriptId)) {
//         const script = document.createElement("script");
//         script.src = "https://studio.pickaxe.co/api/embed/bundle.js";
//         script.defer = true;
//         script.id = scriptId;
//         document.body.appendChild(script);
//       }
//     }
//   }, [isOpen]);

//   return (
//     <>
//       {isOpen && (
//         <Card className="fixed bottom-20 right-4 w-96 h-[32rem] flex flex-col z-50 shadow-xl">
//           <div className="flex items-center justify-between px-4 py-2 bg-primary text-primary-foreground border-b rounded-t">
//             <div className="flex items-center gap-2">
//               <Bot className="w-5 h-5" />
//               <span className="text-sm font-semibold">Money Helper</span>
//             </div>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setIsOpen(false)}
//             >
//               <X className="w-4 h-4" />
//             </Button>
//           </div>

//           <div className="flex-1 overflow-hidden p-2">
//             <div
//               id="deployment-f2585422-eeb0-46ec-aad0-59e1946eb1f7"
//               style={{ width: "100%", height: "100%" }}
//             />
//           </div>
//         </Card>
//       )}

//       <Button
//         onClick={() => setIsOpen((prev) => !prev)}
//         className="fixed bottom-4 right-4 w-14 h-14 rounded-full shadow-lg z-50"
//         variant="hero"
//       >
//         <MessageCircle className="w-6 h-6" />
//       </Button>
//     </>
//   );
// };

// export default ChatbotWidget;

//////// AI CHATBOT OPEN AI
// import { useState } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Bot, User, MessageCircle, X, Send } from "lucide-react";

// interface Message {
//   id: number;
//   text: string;
//   sender: "user" | "bot";
// }

// const ChatbotWidget = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: 1,
//       text: "Hi! I'm your financial literacy assistant. Ask me about budgeting, saving, credit, or investing!",
//       sender: "bot",
//     },
//   ]);

//   const handleSend = async () => {
//     console.log(
//       "Sending request with key:",
//       import.meta.env.VITE_OPENAI_API_KEY
//     );

//     if (!input.trim()) return;

//     const userMsg: Message = {
//       id: messages.length + 1,
//       text: input,
//       sender: "user",
//     };

//     const updatedMessages = [...messages, userMsg];
//     setMessages(updatedMessages);
//     setInput("");

//     try {
//       const res = await axios.post(
//         "https://api.openai.com/v1/chat/completions",
//         {
//           model: "gpt-3.5-turbo",
//           messages: [
//             {
//               role: "system",
//               content:
//                 "You are a helpful assistant that explains financial literacy topics in clear, friendly, beginner-level language.",
//             },
//             ...updatedMessages.map((msg) => ({
//               role: msg.sender === "user" ? "user" : "assistant",
//               content: msg.text,
//             })),
//           ],
//           max_tokens: 300,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const botReply: Message = {
//         id: updatedMessages.length + 1,
//         text: res.data.choices[0].message.content.trim(),
//         sender: "bot",
//       };

//       setMessages((prev) => [...prev, botReply]);
//     } catch (err) {
//       console.error("Chatbot API Error:", err);
//       const fallbackReply: Message = {
//         id: updatedMessages.length + 1,
//         text: "Sorry, I’m having trouble responding right now. Please try again later.",
//         sender: "bot",
//       };
//       setMessages((prev) => [...prev, fallbackReply]);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") handleSend();
//   };

//   return (
//     <>
//       {isOpen && (
//         <Card className="fixed bottom-20 right-4 w-80 h-96 flex flex-col z-50 shadow-xl">
//           {/* Header */}
//           <div className="flex items-center justify-between px-4 py-2 bg-primary text-primary-foreground border-b rounded-t">
//             <div className="flex items-center gap-2">
//               <Bot className="w-5 h-5" />
//               <span className="text-sm font-semibold">Money Helper</span>
//             </div>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setIsOpen(false)}
//             >
//               <X className="w-4 h-4" />
//             </Button>
//           </div>

//           {/* Messages */}
//           <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
//             {messages.map((msg) => (
//               <div
//                 key={msg.id}
//                 className={`flex ${
//                   msg.sender === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`px-3 py-2 rounded-lg max-w-[75%] text-sm ${
//                     msg.sender === "user"
//                       ? "bg-primary text-primary-foreground"
//                       : "bg-muted text-muted-foreground"
//                   }`}
//                 >
//                   <div className="flex items-start gap-2">
//                     {msg.sender === "bot" && (
//                       <Bot className="w-4 h-4 mt-0.5 shrink-0" />
//                     )}
//                     {msg.sender === "user" && (
//                       <User className="w-4 h-4 mt-0.5 shrink-0" />
//                     )}
//                     <span>{msg.text}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Input */}
//           <div className="p-3 border-t">
//             <div className="flex items-center gap-2">
//               <Input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={handleKeyPress}
//                 placeholder="Ask about money..."
//               />
//               <Button onClick={handleSend} disabled={!input.trim()} size="sm">
//                 <Send className="w-4 h-4" />
//               </Button>
//             </div>
//           </div>
//         </Card>
//       )}

//       {/* Floating Button */}
//       <Button
//         onClick={() => setIsOpen((prev) => !prev)}
//         className="fixed bottom-4 right-4 w-14 h-14 rounded-full shadow-lg z-50"
//         variant="hero"
//       >
//         <MessageCircle className="w-6 h-6" />
//       </Button>
//     </>
//   );
// };

// export default ChatbotWidget;
