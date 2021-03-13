export const timeout = (ms: number | undefined): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
