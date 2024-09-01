"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export default function RoomForm() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const generateRoomId = () => {
    const newRoomId = uuidv4();
    setRoomId(newRoomId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roomId || !username) {
      toast.error("All fileds required");
      return;
    }
    else {
      router.push(`/room/${roomId}?username=${encodeURIComponent(username)}`);
    }
  };

  const handleInputEnter = (e) => {
    if (e.code === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="shadow-lg rounded-lg p-6 w-full lg:w-1/3">
        <h2 className="text-xl lg:text-2xl font-semibold text-center">Join Room</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="roomId" className="block text-sm font-medium text-white">
              Room ID
            </label>
            <div className="flex">
              <input
                type="text"
                id="roomId"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="p-2 w-full border border-gray-300 rounded-md shadow-sm text-orange-600 font-extrabold text-xl"
                placeholder="Enter Room ID"
                onKeyUp={handleInputEnter}
                required
              />
              <button
                type="button"
                onClick={generateRoomId}
                className="ml-2 bg-orange-600 text-white px-3 py-2 rounded-md hover:bg-orange-700 focus:outline-none text-xl"
              >
                Generate
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm text-orange-600 font-extrabold text-xl"
              placeholder="Enter Username"
              onKeyUp={handleInputEnter}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none text-xl"
          >
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
}
