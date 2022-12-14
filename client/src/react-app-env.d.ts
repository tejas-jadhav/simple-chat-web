/// <reference types="react-scripts" />

interface Message {
  id?: string;
  text: string;
  direction: "sent" | "received" | "info";
  user?: User;
}

interface User {
  name: string;
  room: string;
  id?: string;
}
