type LocalFetch = typeof fetch

export const localFetch: LocalFetch = (input, init) => {
  const { headers, ...rest } = init ?? {}

  const crfsToken = document
    .querySelector("[name='csrf-token']")
    ?.getAttribute('content')

  if (!crfsToken) {
    throw new Error('CSRF token not found')
  }

  const customInt: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': crfsToken,
      ...(headers ?? {}),
    },
    ...rest,
  }

  return fetch(input, customInt)
}
