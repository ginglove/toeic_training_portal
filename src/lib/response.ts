import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  meta?: {
    page?: number;
    pageSize?: number;
    totalCount?: number;
    timestamp?: string;
    [key: string]: any;
  };
}

export function apiSuccess<T>(data: T, meta?: Record<string, any>, status = 200) {
  const body: ApiResponse<T> = {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
  };
  return NextResponse.json(body, { status });
}

export interface ApiProblemDetails {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  invalidParams?: Array<{ name: string; reason: string }>;
}

export function apiProblem(
  status: number,
  title: string,
  detail: string,
  instance: string,
  type = 'about:blank',
  invalidParams?: Array<{ name: string; reason: string }>
) {
  const problem: ApiProblemDetails = {
    type,
    title,
    status,
    detail,
    instance,
    ...(invalidParams ? { invalidParams } : {}),
  };
  return NextResponse.json(problem, {
    status,
    headers: {
      'Content-Type': 'application/problem+json',
    },
  });
}
