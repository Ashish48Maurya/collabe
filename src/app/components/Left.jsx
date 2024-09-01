import React from 'react'
import Avatar from "react-avatar";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Left({users,roomId}) {
    const router = useRouter();
    
    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied to your clipboard');
        } catch (err) {
            toast.error(`Could not copy the Room ID: ${err.message}`);
        }
    }

    function leaveRoom() {
        router.push('/');
    }

    return (
        <div className="flex flex-col flex-1">
            <div className="flex flex-col gap-4 p-2">
                {users?.map((user) => (
                    <div key={user.id} className="flex items-center gap-2">
                        <Avatar name={user.username} size="40" round={true} />
                        <span>{user.username}</span>
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-2 m-2 mt-auto">
                <button className="w-full bg-orange-500 text-white p-2 rounded" onClick={copyRoomId}>
                    Copy Room ID
                </button>
                <button className="w-full bg-red-600 text-white p-2 rounded" onClick={leaveRoom}>
                    Leave Room
                </button>
            </div>
        </div>
    )
}