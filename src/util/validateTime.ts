const validateTime = (target: string): string => {
  try {
    target = new Date(target).toISOString()
    return target
  } catch (e: any) {
    throw new Error(e.message)
  }
}

export { validateTime }
