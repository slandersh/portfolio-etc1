"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { routes, protectedRoutes } from "@/resources";
import { Flex, Spinner, Button, Heading, Column, PasswordInput } from "@once-ui-system/core";
import NotFound from "@/app/not-found";

interface RouteGuardProps {
  children: React.ReactNode; // Konten yang akan dirender jika rute diizinkan dan terautentikasi
}

/**
 * Komponen pelindung rute (Route Guard) yang mengontrol akses ke setiap halaman.
 *
 * Cara kerja:
 * 1. Saat URL berubah, komponen memeriksa apakah rute saat ini aktif di konfigurasi `routes`.
 *    - Jika tidak aktif → tampilkan halaman 404 (NotFound).
 * 2. Jika rute aktif, cek apakah rute tersebut memerlukan password (di `protectedRoutes`).
 *    - Jika memerlukan password → panggil `/api/check-auth` untuk memeriksa sesi yang ada.
 *    - Jika sudah terautentikasi → langsung render children.
 *    - Jika belum → tampilkan form input password.
 * 3. Password diverifikasi di `/api/authenticate`. Jika benar, sesi disimpan dan childen dirender.
 *
 * State yang dikelola:
 * - `isRouteEnabled`    — Apakah rute ini diizinkan berdasarkan konfigurasi
 * - `isPasswordRequired` — Apakah rute ini dilindungi password
 * - `isAuthenticated`   — Apakah pengguna sudah berhasil login
 * - `password`          — Input password dari form
 * - `error`             — Pesan error jika password salah
 * - `loading`           — Status loading saat pemeriksaan rute sedang berjalan
 */
const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const [isRouteEnabled, setIsRouteEnabled] = useState(false);
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performChecks = async () => {
      setLoading(true);
      setIsRouteEnabled(false);
      setIsPasswordRequired(false);
      setIsAuthenticated(false);

      const checkRouteEnabled = () => {
        if (!pathname) return false;

        if (pathname in routes) {
          return routes[pathname as keyof typeof routes];
        }

        const dynamicRoutes = ["/blog", "/work"] as const;
        for (const route of dynamicRoutes) {
          if (pathname?.startsWith(route) && routes[route]) {
            return true;
          }
        }

        return false;
      };

      const routeEnabled = checkRouteEnabled();
      setIsRouteEnabled(routeEnabled);

      if (protectedRoutes[pathname as keyof typeof protectedRoutes]) {
        setIsPasswordRequired(true);

        const response = await fetch("/api/check-auth");
        if (response.ok) {
          setIsAuthenticated(true);
        }
      }

      setLoading(false);
    };

    performChecks();
  }, [pathname]);

  const handlePasswordSubmit = async () => {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setError(undefined);
    } else {
      setError("Incorrect password");
    }
  };

  if (loading) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  if (!isRouteEnabled) {
    return <NotFound />;
  }

  if (isPasswordRequired && !isAuthenticated) {
    return (
      <Column paddingY="128" maxWidth={24} gap="24" center>
        <Heading align="center" wrap="balance">
          This page is password protected
        </Heading>
        <Column fillWidth gap="8" horizontal="center">
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error}
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </Column>
      </Column>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };
