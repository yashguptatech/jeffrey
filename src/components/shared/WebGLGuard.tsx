"use client";

import { ReactNode, useMemo } from "react";

export function WebGLGuard({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback: ReactNode;
}) {
  const supported = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  }, []);

  if (supported === null) {
    return <div className="scene-shell shimmer" aria-hidden="true" />;
  }

  return supported ? <>{children}</> : <>{fallback}</>;
}
