import { type NextRequest, NextResponse } from "next/server";

// 指定使用 Node.js runtime 而不是 Edge runtime
export const runtime = 'nodejs'

export async function middleware(request: NextRequest) {
  // 跳过 Better Auth 的 API 路由
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    return;
  }

  // 跳过静态文件和公共路由
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/favicon.ico') ||
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register') ||
    request.nextUrl.pathname.startsWith('/error')
  ) {
    return;
  }

  try {
    // 检查是否有认证cookie
    const authCookie = request.cookies.get('better-auth.session_token');
    
    // 如果没有认证cookie，直接重定向
    if (!authCookie) {
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // 如果有cookie，让请求继续（实际的会话验证会在页面组件中进行）
    return NextResponse.next();
  } catch (error) {
    console.error("认证检查失败:", error);
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirect", request.nextUrl.pathname);
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
     * - api/auth (Better Auth routes)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|api/auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
