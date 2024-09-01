"use client"
import React, { useState } from 'react';

export default function RoomForm() {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Room ID: ${roomId}, Username: ${username}`);
    // Add your form submission logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/3">
        <h2 className="text-xl lg:text-2xl font-semibold text-center">Join Room</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="roomId" className="block text-sm font-medium text-gray-700">
              Room ID
            </label>
            <input
              type="text"
              id="roomId"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className=" p-2 w-full border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter Room ID"
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter Username"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none "
          >
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
}
