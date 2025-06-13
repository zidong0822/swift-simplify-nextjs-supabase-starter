import { type NextRequest, NextResponse } from "next/server";

// 不需要认证的公共路由
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/error',
  '/i18n-demo'
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 跳过静态文件和 API 路由
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(svg|png|jpg|jpeg|gif|webp)$/)
  ) {
    return NextResponse.next();
  }

  // 检查是否是公共路由
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  if (isPublicRoute) {
    // 对于公共路由，直接通过
    return NextResponse.next();
  }

  // 对于受保护的路由，检查认证
  try {
    const authCookie = request.cookies.get("better-auth.session_token");

    if (!authCookie) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // 认证通过，继续处理请求
    return NextResponse.next();
  } catch (error) {
    console.error("认证检查失败:", error);
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file) 
     * - api (API routes)
     */
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
