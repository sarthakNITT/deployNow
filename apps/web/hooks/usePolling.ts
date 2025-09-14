'use client'

import { useQuery } from '@tanstack/react-query'

interface UsePollingOptions {
  interval?: number
  enabled?: boolean
}

export function usePolling<T>(
  queryFn: () => Promise<T> | null,
  options: UsePollingOptions = {}
) {
  const { interval = 1000, enabled = true } = options

  return useQuery({
    queryKey: ['polling', queryFn.toString()],
    queryFn,
    refetchInterval: enabled ? interval : false,
    enabled: enabled && !!queryFn,
    retry: false, // Don't retry failed polling requests
  })
}