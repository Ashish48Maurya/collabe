"use client";
import Left from "@/app/components/Left";
import Right from "@/app/components/Right";
import { initSocket } from "@/app/socket";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { FaTimes, FaBars } from "react-icons/fa";
import { useSearchParams } from 'next/navigation';

export default function Room({ params }) {
  const searchParams = useSearchParams();
  const username = searchParams.get('username');
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const roomId = params.roomId;
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      function handleErrors(e) {
        console.log('socket error', e);
        toast.error('Socket connection failed, try again later.');
        router.push('/');
      }

      socketRef.current.emit("join", {
        roomId,
        username,
      });

      socketRef.current.on(
        "joined",
        ({ clients, username, socketId }) => {
          if (username !== searchParams.get('username')) {
            toast.success(`${username} joined the room.`);
            console.log(`${username} joined`);
          }
          setUsers(clients);
          socketRef.current.emit("sync-code", {
            code: codeRef.current,
            socketId,
          });
        }
      );

      socketRef.current.on(
        "disconnected",
        ({ socketId, username }) => {
          toast.success(`${username} left the room.`);
          setUsers((prev) => {
            return prev.filter(
              (client) => client.socketId !== socketId
            );
          });
        }
      );

    };
    init();
  }, []);


  if (!searchParams) {
    return router.push('/');
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row min-h-screen">

      {/* Left Side */}
      <div
        className={`flex flex-col justify-between p-4 lg:p-0 w-full lg:w-1/5 min-h-screen border-r-2 border-gray-600 transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0 block" : "-translate-x-full hidden"
          }`}
      >
        <div className="flex justify-between m-2">
          <span className="font-extrabold text-xl">Collabedit</span>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:block">
            <FaTimes size={20} />
          </button>
        </div>

        <Left users={users} roomId={roomId} />
      </div>


      {/* Right Side */}
      <div className="w-full min-h-screen ">
        {!isSidebarOpen && (
          <div className="flex gap-2 items-center m-2">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-white p-2 rounded"
            >
              <FaBars size={20} />
            </button>
            <span className="font-extrabold text-xl">Collabedit</span>
          </div>
        )}

        <Right socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>

    </div>
  );
}



