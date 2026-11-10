import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ACCESS_COOKIE = "love-page-access";
const ACCESS_COOKIE_VALUE = "love-page-unlocked:v1";

function getSessionToken() {
  const secret = process.env.LOVE_PAGE_SESSION_SECRET;
  if (!secret) {
    throw new Error("LOVE_PAGE_SESSION_SECRET must be configured.");
  }

  return createHmac("sha256", secret).update(ACCESS_COOKIE_VALUE).digest("hex");
}

function isSessionValid(value: string | undefined) {
  if (!value || !/^[a-f0-9]{64}$/.test(value)) {
    return false;
  }

  const expected = Buffer.from(getSessionToken(), "hex");
  const provided = Buffer.from(value, "hex");
  return timingSafeEqual(expected, provided);
}

async function unlockLovePage(formData: FormData) {
  "use server";

  const expectedPassword = process.env.LOVE_PAGE_PASSWORD;
  const secret = process.env.LOVE_PAGE_SESSION_SECRET;
  if (!expectedPassword || !secret) {
    throw new Error("LovePage password and session secret must be configured.");
  }

  const submittedPassword = formData.get("password");
  const submitted = typeof submittedPassword === "string" ? Buffer.from(submittedPassword) : Buffer.alloc(0);
  const expected = Buffer.from(expectedPassword);
  const passwordMatches =
    submitted.length === expected.length && timingSafeEqual(submitted, expected);

  if (!passwordMatches) {
    redirect("/lovepage?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(ACCESS_COOKIE, getSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/lovepage",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/lovepage");
}

interface PageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function LovePage({ searchParams }: PageProps) {
  const cookieStore = await cookies();
  const hasAccess = isSessionValid(cookieStore.get(ACCESS_COOKIE)?.value);
  const { error } = await searchParams;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#18051f] px-4 py-12 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-fuchsia-700/25 blur-3xl" />
        <div className="absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-rose-600/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <section className="relative w-full max-w-md rounded-3xl border border-white/15 bg-white/[0.08] p-7 text-center shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
        <div className="mb-5 text-4xl" aria-hidden="true">
          💌
        </div>

        {hasAccess ? (
          <>
            <p className="text-sm font-medium tracking-[0.2em] text-pink-200/80 uppercase">
              Access granted
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
              Welcome, Sweetheart
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
              Your private love page is ready for its next surprise. 💜
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-medium tracking-[0.2em] text-pink-200/80 uppercase">
              A little secret
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
              This page is just for you
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
              Enter the password to open your special page.
            </p>

            <form action={unlockLovePage} className="mt-7 space-y-4 text-left">
              <label htmlFor="password" className="block text-sm font-medium text-pink-100">
                Password
              </label>
              <input
                autoComplete="current-password"
                autoFocus
                className="w-full rounded-xl border border-white/20 bg-black/20 px-4 py-3 text-center text-lg tracking-[0.2em] text-white outline-none transition placeholder:text-white/40 focus:border-pink-300 focus:ring-4 focus:ring-pink-300/20"
                id="password"
                name="password"
                placeholder="Enter password"
                required
                type="password"
              />
              {error === "1" && (
                <p className="text-center text-sm text-rose-200" role="alert">
                  That password doesn&apos;t look right. Please try again.
                </p>
              )}
              <button
                className="w-full rounded-xl bg-linear-to-r from-pink-500 to-rose-500 px-5 py-3 font-semibold text-white shadow-lg shadow-rose-950/30 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-200/50 active:scale-[0.98]"
                type="submit"
              >
                Open my page <span aria-hidden="true">♥</span>
              </button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}