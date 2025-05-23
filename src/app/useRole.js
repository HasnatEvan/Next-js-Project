// app/useRole.js
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const useRole = () => {
  const { data: session, status } = useSession();
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      const fetchRole = async () => {
        try {
          const res = await axios.get(`https://hotelbookings-system-app.vercel.app/api/users/role/${session.user.email}`);
          setRole(res.data?.role || "");
        } catch (error) {
          console.error("Error fetching role:", error);
          setRole("");
        } finally {
          setIsLoading(false);
        }
      };

      fetchRole();
    } else if (status !== "loading") {
      setIsLoading(false);
    }
  }, [session?.user?.email, status]);

  return [role, isLoading];
};

export default useRole;
