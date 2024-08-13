"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function ProfilePage() {
  const [data, setData] = useState<any>("");
  const router = useRouter();
  const signOut = async () => {
    try {
      await axios("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const getUserDetails = async () => {
    const res = await axios("/api/users/me");
    setData(res.data?.data);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      Profile Page
      <hr />
      <h2>
        {data === "" ? (
          "No User"
        ) : (
          <Link href={`/profile/${data?._id}`}>data</Link>
        )}
      </h2>
      <button onClick={() => signOut()} className="btn bg-black text-white">
        Logout
      </button>
      <button
        onClick={() => getUserDetails()}
        className="btn bg-black text-white"
      >
        Tap to Get User
      </button>
    </div>
  );
}
