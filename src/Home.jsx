// import React, { useEffect, useState, useRef } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:3000");

// function App() {
//   const [username, setUsername] = useState("");
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [room, setRoom] = useState("");
//   const [activeChat, setActiveChat] = useState(null); // { type: 'group'|'private', name: string }
//   const [messages, setMessages] = useState([]);
//   const [privateMsgs, setPrivateMsgs] = useState({});
//   const messagesEndRef = useRef(null);

//   // Auto-scroll to latest message
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, privateMsgs, activeChat]);

//   useEffect(() => {
//     // Handle user list updates from server
//     socket.on("user_list", (userList) => {
//       setUsers(userList.filter((u) => u !== username));
//     });

//     // Group message
//     socket.on("receive_message", (msg) => {
//       if (activeChat?.type === "group" && activeChat.name === msg.room) {
//         setMessages((prev) => [...prev, { user: msg.from, text: msg.message, room: msg.room }]);
//       }
//     });

//     // Private message
//     socket.on("receive_user_message", (msg) => {
//       setPrivateMsgs((prev) => {
//         const list = prev[msg.from] || [];
//         return { ...prev, [msg.from]: [...list, { from: msg.from, text: msg.message, timestamp: Date.now() }] };
//       });
//     });

//     // Error handling
//     socket.on("error_message", (err) => {
//       alert(`Error: ${err.message}`);
//       console.error("❌ Error:", err);
//     });

//     // Handle user disconnection
//     socket.on("user_disconnect", ({ userId }) => {
//       setUsers((prev) => prev.filter((u) => u !== userId));
//       if (activeChat?.type === "private" && activeChat.name === userId) {
//         setActiveChat(null);
//       }
//     });

//     return () => {
//       socket.off("user_list");
//       socket.off("receive_message");
//       socket.off("receive_user_message");
//       socket.off("error_message");
//       socket.off("user_disconnect");
//       socket.disconnect();
//     };
//   }, [activeChat, username]);

//   const login = () => {
//     if (username.trim()) {
//       socket.emit("user_connect", { userId: username });
//       setLoggedIn(true);
//     }
//   };

//   const joinRoom = () => {
//     if (room.trim()) {
//       socket.emit("join_group", { groupName: room, userId: username });
//       setActiveChat({ type: "group", name: room });
//       setRoom("");
//     }
//   };

//   const sendGroupMsg = (text) => {
//     if (activeChat?.type === "group" && text.trim()) {
//       socket.emit("message", { message: text, room: activeChat.name, from: username });
//       setMessages((prev) => [...prev, { user: username, text, room: activeChat.name, timestamp: Date.now() }]);
//     }
//   };

//   const sendPrivateMsg = (to, text) => {
//     if (text.trim()) {
//       socket.emit("user_to_user_message", { from: username, to, message: text });
//       setPrivateMsgs((prev) => {
//         const list = prev[to] || [];
//         return { ...prev, [to]: [...list, { from: username, text, timestamp: Date.now() }] };
//       });
//     }
//   };

//   if (!loggedIn) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-100">
//         <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
//           <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome to Chat</h2>
//           <input
//             type="text"
//             placeholder="Enter username"
//             className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && login()}
//           />
//           <button
//             onClick={login}
//             disabled={!username.trim()}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
//           >
//             Enter Chat
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-80 bg-white shadow-lg flex flex-col">
//         <div className="p-6 border-b border-gray-200">
//           <h3 className="text-xl font-semibold text-gray-800">Hello, {username}</h3>
//         </div>

//         <div className="p-6 border-b border-gray-200">
//           <h4 className="font-semibold text-gray-700 mb-3">Join a Group</h4>
//           <input
//             type="text"
//             placeholder="Room name"
//             className="w-full border border-gray-300 p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
//             value={room}
//             onChange={(e) => setRoom(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && joinRoom()}
//           />
//           <button
//             onClick={joinRoom}
//             disabled={!room.trim()}
//             className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
//           >
//             Join Group
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4">
//           <h4 className="font-semibold text-gray-700 mb-3">Online Users</h4>
//           <ul className="space-y-2">
//             {users.map((u, i) => (
//               <li
//                 key={i}
//                 onClick={() => setActiveChat({ type: "private", name: u })}
//                 className={`p-3 rounded-lg cursor-pointer transition-colors ${
//                   activeChat?.type === "private" && activeChat.name === u
//                     ? "bg-blue-100 font-semibold text-blue-800"
//                     : "hover:bg-gray-100 text-gray-700"
//                 }`}
//               >
//                 {u}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Main Chat */}
//       <div className="flex-1 flex flex-col bg-white">
//         <div className="p-6 border-b border-gray-200 bg-gray-50">
//           <h3 className="text-xl font-semibold text-gray-800">
//             {activeChat
//               ? activeChat.type === "group"
//                 ? `Group: ${activeChat.name}`
//                 : `Chat with ${activeChat.name}`
//               : "Select a chat"}
//           </h3>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-4">
//           {!activeChat && (
//             <p className="text-gray-500 text-center">Select a group or user to start chatting</p>
//           )}

//           {activeChat?.type === "group" &&
//             messages
//               .filter((m) => m.room === activeChat.name)
//               .map((m, i) => (
//                 <div
//                   key={i}
//                   className={`flex ${m.user === username ? "justify-end" : "justify-start"}`}
//                 >
//                   <div
//                     className={`max-w-xs md:max-w-md p-3 rounded-lg ${
//                       m.user === username
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-200 text-gray-800"
//                     }`}
//                   >
//                     <span className="font-semibold">{m.user}: </span>
//                     <span>{m.text}</span>
//                   </div>
//                 </div>
//               ))}

//           {activeChat?.type === "private" &&
//             (privateMsgs[activeChat.name] || []).map((m, i) => (
//               <div
//                 key={i}
//                 className={`flex ${m.from === username ? "justify-end" : "justify-start"}`}
//               >
//                 <div
//                   className={`max-w-xs md:max-w-md p-3 rounded-lg ${
//                     m.from === username ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
//                   }`}
//                 >
//                   <span className="font-semibold">{m.from}: </span>
//                   <span>{m.text}</span>
//                 </div>
//               </div>
//             ))}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input */}
//         {activeChat && (
//           <div className="p-4 border-t border-gray-200 bg-white flex gap-3">
//             <ChatInput
//               onSend={(text) => {
//                 if (activeChat.type === "group") sendGroupMsg(text);
//                 else sendPrivateMsg(activeChat.name, text);
//               }}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function ChatInput({ onSend }) {
//   const [text, setText] = useState("");

//   return (
//     <>
//       <input
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Type message..."
//         className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         onKeyDown={(e) => {
//           if (e.key === "Enter" && text.trim()) {
//             onSend(text);
//             setText("");
//           }
//         }}
//       />
//       <button
//         onClick={() => {
//           if (text.trim()) {
//             onSend(text);
//             setText("");
//           }
//         }}
//         disabled={!text.trim()}
//         className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
//       >
//         Send
//       </button>
//     </>
//   );
// }

// export default App;
